const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bookingValidation = require('../../validations/booking.validation');
const bookingController = require('../../controllers/booking.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createBooking'), validate(bookingValidation.createBooking), bookingController.createBooking)
  .get(auth('getBookings'), validate(bookingValidation.getBookings), bookingController.getBookings);

router.route('/:bookingId').get(auth('getBooking'), validate(bookingValidation.getBooking), bookingController.getBooking);

module.exports = router;
