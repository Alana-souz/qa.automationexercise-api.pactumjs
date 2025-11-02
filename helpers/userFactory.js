import pactum from 'pactum';
import { baseUrl } from '../pactum.config.js';

export const createUser = async (user) => {
  const res = await pactum.spec()
    .post(`${baseUrl}/usuarios`)
    .withJson(user)
    .expectStatus(201);
  return res.body;
};

export const deleteUser = async (_id) => {
  await pactum.spec()
    .delete(`${baseUrl}/usuarios/${_id}`)
    .expectStatus(200);
};

export const getUserById = async (_id) => {
  const res = await pactum.spec()
    .get(`${baseUrl}/usuarios/${_id}`)
    .expectStatus(200);
  return res.body;
};
