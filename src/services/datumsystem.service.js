const httpStatus = require('http-status');
const { DatumSystem } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} datumsystemBody
 * @returns {Promise<DatumSystem>}
 */
const createDatumSystem = async (datumsystemBody) => {
  // if (await DatumSystem.isAvailable(datumsystemBody.code)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  // }
  return DatumSystem.create(datumsystemBody);
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
const queryDatumSystems = async (filter, options) => {
  const datumsystems = await DatumSystem.paginate(filter, options);
  return datumsystems;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<DatumSystem>}
 */
const getDatumSystemById = async (id) => {
  return DatumSystem.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<DatumSystem>}
 */
const getDatumSystemByCode = async (code) => {
  return DatumSystem.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<DatumSystem>}
 */
const updateDatumSystemById = async (datumsystemId, updateBody) => {
  const datumsystem = await getDatumSystemById(datumsystemId);
  if (!datumsystem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DatumSystem not found');
  }
  Object.assign(datumsystem, updateBody);
  await datumsystem.save();
  return datumsystem;
};

/**
 * Delete datumsystem by id
 * @param {ObjectId} datumsystemId
 * @returns {Promise<DatumSystem>}
 */
const deleteDatumSystemById = async (datumsystemId) => {
  const datumsystem = await getDatumSystemById(datumsystemId);
  if (!datumsystem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DatumSystem not found');
  }
  await datumsystem.remove();
  return datumsystem;
};


module.exports = {
  createDatumSystem,
  queryDatumSystems,
  getDatumSystemById,
  updateDatumSystemById,
  deleteDatumSystemById,
};
