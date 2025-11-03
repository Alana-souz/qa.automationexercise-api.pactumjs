import pactum from 'pactum';
import { baseUrl } from '../../pactum.config.js';
import { produtoSchema } from '../../schemas/produtoSchema.js';
import Joi from 'joi';

const { spec, request } = pactum;

describe('Produtos - Api e Contrato', () => {
  let tokenAdmin;
  let testProduto;

  before(async () => {
    request.setBaseUrl(baseUrl);
    request.setDefaultHeaders({ 'Content-Type': 'application/json' });

    // Cria usuário admin
    const adminUser = {
      nome: 'Admin QA',
      email: `admin_${Date.now()}@qa.com`,
      password: 'teste123',
      administrador: 'true'
    };

    await spec().post('/usuarios').withJson(adminUser).expectStatus(201);

    // Login para obter token
    const resLogin = await spec()
      .post('/login')
      .withJson({ email: adminUser.email, password: adminUser.password })
      .expectStatus(200);

    tokenAdmin = resLogin.body.authorization.startsWith('Bearer ')
      ? resLogin.body.authorization
      : `Bearer ${resLogin.body.authorization}`;
  });

  // ============================
  // Testes de Api
  // ============================
  it('GET /produtos - Busca dos produtos', async () => {
    const res = await spec()
      .get('/produtos')
      .withHeaders('Authorization', tokenAdmin)
      .expectStatus(200);

    const produtosArray = Array.isArray(res.body) ? res.body : res.body.produtos;
    if (!Array.isArray(produtosArray)) throw new Error('Esperado array de produtos');

    if (produtosArray.length > 0) {
      Joi.assert(produtosArray[0], produtoSchema);
    }
  });

  it('POST /produtos - Cadastro de produto', async () => {
    const novoProduto = {
      nome: `Produto QA ${Date.now()}`,
      preco: 100,
      descricao: 'Produto de teste',
      quantidade: 10
    };

    const res = await spec()
      .post('/produtos')
      .withHeaders('Authorization', tokenAdmin)
      .withJson(novoProduto)
      .expectStatus(201);

    testProduto = { ...novoProduto, _id: res.body._id };
  });

  it('GET /produtos/{_id} - Busca do produto por id', async () => {
    const res = await spec()
      .get(`/produtos/${testProduto._id}`)
      .withHeaders('Authorization', tokenAdmin)
      .expectStatus(200);

    Joi.assert(res.body, produtoSchema);
  });

  it('PUT /produtos/{_id} - Edição do produto por id', async () => {
    const { _id, ...produtoSemId } = testProduto;
    const produtoAtualizado = {
      ...produtoSemId,
      nome: `Produto QA Atualizado ${Date.now()}`,
      preco: 150,
      quantidade: 15
    };

    const res = await spec()
      .put(`/produtos/${testProduto._id}`)
      .withHeaders('Authorization', tokenAdmin)
      .withJson(produtoAtualizado)
      .expectStatus(200);

    if (res.body.message !== 'Registro alterado com sucesso') {
      throw new Error(`Esperado 'Registro alterado com sucesso', mas retornou: ${res.body.message}`);
    }

    testProduto = { ...produtoAtualizado, _id: testProduto._id };
  });

  it('DELETE /produtos/{_id} - Exclusão do produto por id', async () => {
    await spec()
      .delete(`/produtos/${testProduto._id}`)
      .withHeaders('Authorization', tokenAdmin)
      .expectStatus(200)
      .expectJsonLike({ message: 'Registro excluído com sucesso' });
  });

  // ============================
  // Teste de Contrato
  // ============================
  it('POST /produtos - Teste de contrato do cadastro de produto com sucesso', async () => {
    const produtoContrato = {
      nome: `Produto Contrato ${Date.now()}`,
      preco: 200,
      descricao: 'Produto de contrato',
      quantidade: 20
    };

    const res = await spec()
      .post('/produtos')
      .withHeaders('Authorization', tokenAdmin)
      .withJson(produtoContrato)
      .expectStatus(201);

    // Validação de contrato
    Joi.assert({ ...produtoContrato, _id: res.body._id }, produtoSchema);

    // Limpeza
    await spec().delete(`/produtos/${res.body._id}`).withHeaders('Authorization', tokenAdmin);
  });
});
