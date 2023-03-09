const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router.route('/').post(auth('writeReview'), validate(reviewValidation.createReview), reviewController.createReview);

module.exports = router;
