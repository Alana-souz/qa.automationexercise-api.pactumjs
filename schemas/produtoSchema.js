import Joi from 'joi';

export const produtoSchema = Joi.object({
  _id: Joi.string().required(),
  nome: Joi.string().required(),
  preco: Joi.number().required(),
  descricao: Joi.string().required(),
  quantidade: Joi.number().required() // agora permitido
});
