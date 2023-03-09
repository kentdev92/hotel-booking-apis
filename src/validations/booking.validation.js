const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBooking = {
  body: Joi.object().keys({
    roomId: Joi.string().custom(objectId).required(),
    checkIn: Joi.date().iso().required(),
    checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required(),
    guests: Joi.number().integer().required(),
  }),
};

const getBookings = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    roomId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

const updateBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      checkIn: Joi.date().iso(),
      checkOut: Joi.date().iso().greater(Joi.ref('checkIn')),
      guests: Joi.number().integer(),
      status: Joi.string().valid('pending', 'confirmed', 'canceled'),
    })
    .min(1),
};

const deleteBooking = {
  params: Joi.object().keys({
    bookingId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};
