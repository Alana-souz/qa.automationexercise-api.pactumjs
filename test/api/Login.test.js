import pactum from 'pactum';
import Joi from 'joi';
import { baseUrl } from '../../pactum.config.js';
import { loginSuccessSchema } from '../../schemas/userSchema.js';

describe('POST /login - Funcional', () => {
  let testUser;

  before(async () => {
    const novoUsuario = {
      nome: 'Fulano QA',
      email: `login${Date.now()}@qa.com`,
      password: 'teste',
      administrador: 'true',
    };

    // Cria usuário para login
    const res = await pactum.spec()
      .post(`${baseUrl}/usuarios`)
      .withJson(novoUsuario)
      .expectStatus(201);

    testUser = { email: novoUsuario.email, password: novoUsuario.password };
  });

  it('Deve realizar login com credenciais válidas', async () => {
    const res = await pactum.spec()
      .post(`${baseUrl}/login`)
      .withBody(testUser)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json');

    Joi.assert(res.body, loginSuccessSchema);
  });


});
