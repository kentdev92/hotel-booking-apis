const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @swagger
   * tags:
   *   name: Rooms
   *   description: Room management and retrieval
   */
  .post(auth('manageRooms'), validate(roomValidation.createRoom), roomController.createRoom)
  .get(auth('getRooms'), validate(roomValidation.getRooms), roomController.getRooms);

router
  .route('/:roomId')
  /**
   * @swagger
   * tags:
   *   name: Rooms
   *   description: Room management and retrieval
   */
  .get(auth('getRooms'), validate(roomValidation.getRoom), roomController.getRoomById)
  .patch(auth('manageRooms'), validate(roomValidation.updateRoom), roomController.updateRoomById)
  .delete(auth('manageRooms'), validate(roomValidation.deleteRoom), roomController.deleteRoomById);

module.exports = router;
