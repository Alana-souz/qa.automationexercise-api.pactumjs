import pactum from 'pactum';
import { baseUrl } from '../../pactum.config.js';
import { usuarioSchema } from '../../schemas/userSchema.js';
import Joi from 'joi';
import * as chai from 'chai';
const { expect } = chai;

const { spec, request } = pactum;

let testUser = null;

describe('Usuários - Funcional', () => {

  before(async () => {
    request.setBaseUrl(baseUrl);
    request.setDefaultHeaders({ 'Content-Type': 'application/json' });

    // Criar usuário dinâmico inicial para os testes
    const novoUsuario = {
      nome: 'QA Funcional',
      email: `qa_funcional_${Date.now()}@qa.com`,
      password: 'teste',
      administrador: 'true'
    };

    const res = await spec()
      .post('/usuarios')
      .withJson(novoUsuario)
      .expectStatus(201);

    testUser = { ...novoUsuario, _id: res.body._id };
  });

  // 🧪 CENÁRIO 1 - POST /usuarios - Criar novo usuário
  it('POST /usuarios - Cadastro com sucesso', async () => {
    const novoUsuario = {
      nome: 'Novo QA',
      email: `novoqa_${Date.now()}@qa.com`,
      password: '123456',
      administrador: 'false'
    };

    const res = await spec()
      .post('/usuarios')
      .withJson(novoUsuario)
      .expectStatus(201);

    expect(res.body.message).to.equal('Cadastro realizado com sucesso');
    expect(res.body).to.have.property('_id');
  });

  // 🧪 CENÁRIO 2 - GET /usuarios - Lista de usuários
  it('GET /usuarios - Busca do usuário', async () => {
    const res = await spec()
      .get('/usuarios')
      .expectStatus(200);

    res.body.usuarios.forEach(u => Joi.assert(u, usuarioSchema));
  });

  // 🧪 CENÁRIO 3 - GET /usuarios/{_id}
  it('GET /usuarios/{_id} - Deve buscar usuário por ID', async () => {
    const res = await spec()
      .get(`/usuarios/${testUser._id}`)
      .expectStatus(200);

    Joi.assert(res.body, usuarioSchema);
  });

  // 🧪 CENÁRIO 4 - PUT /usuarios/{_id}
  it('PUT /usuarios/{_id} -Alteração do usuário por Id', async () => {
    const updated = {
      nome: 'QA Atualizado',
      email: testUser.email,
      password: testUser.password,
      administrador: testUser.administrador
    };

    const res = await spec()
      .put(`/usuarios/${testUser._id}`)
      .withJson(updated)
      .expectStatus(200);

    expect(res.body.message).to.equal('Registro alterado com sucesso');
  });

  // 🧪 CENÁRIO 5 - DELETE /usuarios/{_id}
  it('DELETE /usuarios/{_id} - Exclusão do usuário por Id', async () => {
    await spec()
      .delete(`/usuarios/${testUser._id}`)
      .expectStatus(200);
  });
});
