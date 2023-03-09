const httpStatus = require('http-status');
const { Room, Booking } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a new room
 * @param {Object} roomBody - The room object
 * @returns {Promise<Room>}
 */
const createRoom = async (roomBody) => {
  const room = await Room.create(roomBody);
  return room;
};

/**
 * Query rooms
 * @param {Object} filter - The query filter
 * @param {Object} options - The query options
 * @param {string} [options.sortBy] - The sort field and order. Eg: 'title:desc'
 * @param {number} [options.limit] - The maximum number of results per page (default = 10)
 * @param {number} [options.page] - The page number (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRooms = async (filter, options) => {
  const rooms = await Room.paginate(filter, options);
  return rooms;
};

/**
 * Get a room by id
 * @param {ObjectId} id - The room id
 * @returns {Promise<Room>}
 */
const getRoomById = async (id) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  return room;
};

/**
 * Update a room by id
 * @param {ObjectId} roomId - The room id
 * @param {Object} updateBody - The updated room object
 * @returns {Promise<Room>}
 */
const updateRoomById = async (roomId, updateBody) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  Object.assign(room, updateBody);
  await room.save();
  return room;
};

/**
 * Delete a room by id
 * @param {ObjectId} roomId - The room id
 * @returns {Promise<Room>}
 */
const deleteRoomById = async (roomId) => {
  const room = await getRoomById(roomId);
  if (!room) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Room not found');
  }
  await room.remove();
  return room;
};

/**
 * Get room bookings by roomId
 * @param {ObjectId} roomId
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getRoomBookings = async (roomId, options) => {
  const filter = { roomId };
  const bookings = await Booking.paginate(filter, options);
  return bookings;
};

module.exports = {
  createRoom,
  queryRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
  getRoomBookings,
};
