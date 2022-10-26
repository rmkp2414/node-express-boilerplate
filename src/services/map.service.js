const httpStatus = require('http-status');
const { Map } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} mapBody
 * @returns {Promise<Map>}
 */
const createMap = async (mapBody) => {
  if (await Map.isAvailable(mapBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return Map.create(mapBody);
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
const queryMaps = async (filter, options) => {
  const maps = await Map.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<Map>}
 */
const getMapById = async (id) => {
  return Map.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<Map>}
 */
const getMapByCode = async (code) => {
  return Map.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<Map>}
 */
const updateMapById = async (mapId, updateBody) => {
  const map = await getMapById(mapId);
  if (!map) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
  }
  Object.assign(map, updateBody);
  await map.save();
  return map;
};

/**
 * Delete map by id
 * @param {ObjectId} mapId
 * @returns {Promise<Map>}
 */
const deleteMapById = async (mapId) => {
  const map = await getMapById(mapId);
  if (!map) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Map not found');
  }
  await map.remove();
  return map;
};


module.exports = {
  createMap,
  queryMaps,
  getMapById,
  updateMapById,
  deleteMapById,
};
