import Joi from 'joi';

// Schema para validar usuário retornado pela API (funcional)
export const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  administrador: Joi.string().valid('true', 'false').required(),
  _id: Joi.string().required(),
  password: Joi.string().optional() // ADICIONADO para testes funcionais
});

// Schema para validar cadastro bem-sucedido
export const cadastroSuccessSchema = Joi.object({
  message: Joi.string().valid('Cadastro realizado com sucesso').required(),
  _id: Joi.string().required()
});

// Schema para login bem-sucedido
export const loginSuccessSchema = Joi.object({
  message: Joi.string().valid('Login realizado com sucesso').required(),
  authorization: Joi.string().required()
});
