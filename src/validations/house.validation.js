const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createHouse = {
  body: Joi.object().keys({
    providerId: Joi.string().custom(objectId),
    name: Joi.array().required(),
    images: Joi.array().required(),
    location: Joi.string().required(),
    price: Joi.number().required(),
    about: Joi.string().required().min(10).max(500),
    facilities: Joi.array().required(),
  }),
};

const getHouses = {
  query: Joi.object().keys({
    name: Joi.string(),
    location: Joi.string(),
    provider: Joi.required().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHouse = {
  params: Joi.object().keys({
    houseId: Joi.required().custom(objectId),
  }),
};

const updateHouse = {
  params: Joi.object().keys({
    houseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      images: Joi.array(),
    })
    .min(1),
};

const deleteHouse = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHouse,
  getHouses,
  getHouse,
  updateHouse,
  deleteHouse,
};
