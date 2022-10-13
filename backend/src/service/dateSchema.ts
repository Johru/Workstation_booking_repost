import Joi from 'joi';

export const dateSchema = Joi.date().iso().required();
