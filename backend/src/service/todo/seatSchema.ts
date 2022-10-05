import Joi from 'joi';

export const seatSchema = Joi.object().keys({
  workstation_id: Joi.number().required(),
});
