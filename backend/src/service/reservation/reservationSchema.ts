import Joi from 'joi';

export const reservationSchema = Joi.object().keys({
  user_id: Joi.number().required(),
  seat_id: Joi.number().required(),
  reservation_date: Joi.date().iso().required(),
});
