import Joi from 'joi';

export const buildingSchema = Joi.object().keys({
  building_name: Joi.string().required(),
  building_address: Joi.string().required(),
  building_zip: Joi.string().min(2).max(10).required(),
  building_city: Joi.string().required(),
  building_country: Joi.string().required(),
  building_image: Joi.string().required(),
});
