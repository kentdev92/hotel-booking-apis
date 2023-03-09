const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a room
 *     description: Only users with the `manageRooms` permission can create rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyHeader: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoomCreate'
 *     responses:
 *       '200':
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   get:
 *     summary: Get all rooms
 *     description: Only users with the `getRooms` permission can retrieve all rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyHeader: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of results to return
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of rooms per page to return
 *     responses:
 *       '200':
 *         description: Rooms retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedRooms'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router
  .route('/')
  .post(auth('manageRooms'), validate(roomValidation.createRoom), roomController.createRoom)
  .get(auth('getRooms'), validate(roomValidation.getRooms), roomController.getRooms);

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Get a room by ID
 *     description: Logged in users can retrieve a specific room by ID.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to retrieve
 *     responses:
 *       '200':
 *         description: Room retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Room not found
 *   patch:
 *     summary: Update a room by ID
 *     description: Logged in users with the `manageRooms` permission can update a specific room by ID.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to update
 *       - in: body
 *         name: body
 *         description: Fields to update in the room
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomUpdate'
 *     responses:
 *       '200':
 *         description: Room updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Room not found
 *   delete:
 *     summary: Delete a room by ID
 *     description: Logged in users with the `manageRooms` permission can delete a specific room by ID.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the room to delete
 *     responses:
 *       '204':
 *         description: Room deleted successfully
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Room not found
 */

router
  .route('/:roomId')
  .get(auth('getRooms'), validate(roomValidation.getRoom), roomController.getRoom)
  .patch(auth('manageRooms'), validate(roomValidation.updateRoom), roomController.updateRoom)
  .delete(auth('manageRooms'), validate(roomValidation.deleteRoom), roomController.deleteRoom);

/**
 * @swagger
 * /{roomId}/bookings:
 *   get:
 *     summary: Get all bookings for a specific room
 *     description: Retrieve all bookings for a specific room. User must have 'getRoomBookings' permission.
 *     tags:
 *       - Rooms
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the room to retrieve bookings for
 *     security:
 *       - bearerAuth: []
 *       - apiKey: []
 *     responses:
 *       '200':
 *         description: List of bookings for the specified room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *
 *   security:
 *     - bearerAuth: []
 *     - apiKey: []
 *
 *   parameters:
 *     - name: roomId
 *       in: path
 *       required: true
 *       description: ID of the room to retrieve bookings for
 *       schema:
 *         type: string
 *         format: uuid
 *
 *   responses:
 *     '200':
 *       description: List of bookings for the specified room
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Booking'
 *     '401':
 *       $ref: '#/components/responses/UnauthorizedError'
 *     '403':
 *       $ref: '#/components/responses/ForbiddenError'
 *     '404':
 *       $ref: '#/components/responses/NotFoundError'
 */

router
  .route('/:roomId/bookings')
  .get(auth('getRoomBookings'), validate(roomValidation.getRoomBookings), roomController.getRoomBookings);

module.exports = router;
