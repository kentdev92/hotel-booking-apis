const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRoom = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    location: Joi.string().required(),
  }),
};

const getRooms = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
    location: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
};

const updateRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      location: Joi.string(),
    })
    .min(1),
};

const deleteRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
};

const getRoomBookings = {
  params: Joi.object().keys({
    roomId: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomBookings,
};
