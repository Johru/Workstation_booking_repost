import Joi from 'joi';

export const reservatrionSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
});
