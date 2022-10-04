import Joi from 'joi';

export const workstationSchema = Joi.object().keys({
  floor_id: Joi.number().required(),
  workstation_name: Joi.string().required(),
  workstation_isactive: Joi.boolean(),
});

export const seatSchema = Joi.object().keys({
  workstation_id: Joi.number().required(),
});
