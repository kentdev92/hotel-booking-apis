const httpStatus = require('http-status');
const { House } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} houseBody
 * @returns {Promise<User>}
 */
const createHouse = async (houseBody) => {
  return House.create(houseBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHouses = async (filter, options) => {
  const houses = await House.paginate(filter, options);
  return houses;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getHouseById = async (id) => {
  return House.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} houseId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateHouseById = async (houseId, updateBody) => {
  const house = await getHouseById(houseId);
  if (!house) {
    throw new ApiError(httpStatus.NOT_FOUND, 'House not found');
  }
  Object.assign(house, updateBody);
  await house.save();
  return house;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteHouseById = async (userId) => {
  const house = await getHouseById(userId);
  if (!house) {
    throw new ApiError(httpStatus.NOT_FOUND, 'House not found');
  }
  await house.remove();
  return house;
};

module.exports = {
  createHouse,
  queryHouses,
  getHouseById,
  updateHouseById,
  deleteHouseById,
};
