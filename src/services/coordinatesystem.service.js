const httpStatus = require('http-status');
const { CoordinateSystem } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} coordinatesystemBody
 * @returns {Promise<CoordinateSystem>}
 */
const createCoordinateSystem = async (coordinatesystemBody) => {
  // if (await CoordinateSystem.isAvailable(coordinatesystemBody.code)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  // }
  return CoordinateSystem.create(coordinatesystemBody);
};

/**
 * Query for analysys type
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCoordinateSystems = async (filter, options) => {
  const coordinatesystems = await CoordinateSystem.paginate(filter, options);
  return coordinatesystems;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<CoordinateSystem>}
 */
const getCoordinateSystemById = async (id) => {
  return CoordinateSystem.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<CoordinateSystem>}
 */
const getCoordinateSystemByCode = async (code) => {
  return CoordinateSystem.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<CoordinateSystem>}
 */
const updateCoordinateSystemById = async (coordinatesystemId, updateBody) => {
  const coordinatesystem = await getCoordinateSystemById(coordinatesystemId);
  if (!coordinatesystem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CoordinateSystem not found');
  }
  Object.assign(coordinatesystem, updateBody);
  await coordinatesystem.save();
  return coordinatesystem;
};

/**
 * Delete coordinatesystem by id
 * @param {ObjectId} coordinatesystemId
 * @returns {Promise<CoordinateSystem>}
 */
const deleteCoordinateSystemById = async (coordinatesystemId) => {
  const coordinatesystem = await getCoordinateSystemById(coordinatesystemId);
  if (!coordinatesystem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'CoordinateSystem not found');
  }
  await coordinatesystem.remove();
  return coordinatesystem;
};


module.exports = {
  createCoordinateSystem,
  queryCoordinateSystems,
  getCoordinateSystemById,
  updateCoordinateSystemById,
  deleteCoordinateSystemById,
};
