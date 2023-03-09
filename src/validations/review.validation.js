const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().required(),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    roomId: Joi.string().custom(objectId),
    userId: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      rating: Joi.number().integer().min(1).max(5),
      comment: Joi.string(),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
