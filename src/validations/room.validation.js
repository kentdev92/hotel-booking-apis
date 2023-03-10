const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRoom = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    photos: Joi.array().items(Joi.string()),
    amenities: Joi.array().items(Joi.string().valid('TV', 'WiFi', 'AC', 'parking')).required(),
    capacity: Joi.number().required(),
    size: Joi.number().required(),
    hostId: Joi.string().custom(objectId),
  }),
};

const getRooms = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};

const updateRoom = {
  params: Joi.object().keys({
    roomId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      photos: Joi.array().items(Joi.string()),
      amenities: Joi.array().items(Joi.string().valid('TV', 'WiFi', 'AC', 'parking')),
      capacity: Joi.number(),
      size: Joi.number(),
      hostId: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteRoom = {
  params: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
