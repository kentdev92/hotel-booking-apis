const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageRooms'), validate(roomValidation.createRoom), roomController.createRoom)
  .get(auth('getRooms'), validate(roomValidation.getRooms), roomController.getRooms);

router
  .route('/:roomId')
  .get(auth('getRooms'), validate(roomValidation.getRoom), roomController.getRoom)
  .patch(auth('manageRooms'), validate(roomValidation.updateRoom), roomController.updateRoom)
  .delete(auth('manageRooms'), validate(roomValidation.deleteRoom), roomController.deleteRoom);

router
  .route('/:roomId/bookings')
  .get(auth('getRoomBookings'), validate(roomValidation.getRoomBookings), roomController.getRoomBookings);

module.exports = router;
