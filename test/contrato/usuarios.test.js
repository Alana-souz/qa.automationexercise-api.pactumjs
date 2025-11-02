import pactum from 'pactum';
import { baseUrl } from '../../pactum.config.js';
import { cadastroSuccessSchema } from '../../schemas/userSchema.js';
import Joi from 'joi';

describe('POST /usuarios - Teste de Contrato', () => {

  it('Deve cadastrar usuário com sucesso', async () => {
    const novoUsuario = {
      nome: 'QA Contrato',
      email: `qa_contrato_${Date.now()}@qa.com`,
      password: 'teste',
      administrador: 'true'
    };

    const res = await pactum.spec()
      .post(`${baseUrl}/usuarios`)
      .withJson(novoUsuario)
      .expectStatus(201);

    Joi.assert(res.body, cadastroSuccessSchema);
  });

});
