import Joi from 'joi';

export const floorSchema = Joi.object().keys({
  building_id: Joi.number().required(),
  floor_name: Joi.string().required(),
  floor_capacity: Joi.number().required(),
  floor_plan:Joi.string().required()
});
