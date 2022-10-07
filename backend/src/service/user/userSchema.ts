import Joi from 'joi';

export const userSchema = Joi.object().keys({
  user_name: Joi.string().required(),
  user_login: Joi.string().min(4).required(),
  user_password: Joi.string().min(8).required(),
  user_email: Joi.string().email().required(),
});
