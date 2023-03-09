const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { roomService } = require('../services');

const createRoom = catchAsync(async (req, res) => {
  const room = await roomService.createRoom(req.body);
  res.status(httpStatus.CREATED).send(room);
});

const getRooms = catchAsync(async (req, res) => {
  const rooms = await roomService.getRooms();
  res.status(httpStatus.OK).send(rooms);
});

const getRoom = catchAsync(async (req, res) => {
  const room = await roomService.getRoomById(req.params.roomId);
  res.status(httpStatus.OK).send(room);
});

const updateRoom = catchAsync(async (req, res) => {
  const room = await roomService.updateRoomById(req.params.roomId, req.body);
  res.status(httpStatus.OK).send(room);
});

const deleteRoom = catchAsync(async (req, res) => {
  await roomService.deleteRoomById(req.params.roomId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getRoomBookings = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const { sortBy, limit = 10, page = 1 } = req.query;

  const result = await roomService.getRoomBookings(roomId, sortBy, limit, page);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomBookings,
};
