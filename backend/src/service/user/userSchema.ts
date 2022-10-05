import Joi from 'joi';

export const userSchema = Joi.object().keys({
  user_name: Joi.string().required(),
  user_login: Joi.string().required(),
  user_password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  user_email: Joi.string()
    .pattern(
      new RegExp(
        '^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$'
      )
    )
    .required(),
});
