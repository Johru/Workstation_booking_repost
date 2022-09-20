import Joi from 'joi';

// export const todoSchema = Joi.object().keys({
//   name: Joi.string().required(),
//   description: Joi.string().required(),
//   dueDate: Joi.date().required(),
// });

export const workstationSchema = Joi.object().keys({
  floor_id: Joi.number().required(),
  workstation_name: Joi.string().required(),
  workstation_isactive: Joi.boolean().required(),
});

export const seatSchema = Joi.object().keys({
  workstation_id: Joi.number().required(),
});
