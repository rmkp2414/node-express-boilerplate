const httpStatus = require('http-status');
const { UnitType } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} unittypeBody
 * @returns {Promise<UnitType>}
 */
const createUnitType = async (unittypeBody) => {
  if (await UnitType.isAvailable(unittypeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return UnitType.create(unittypeBody);
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
const queryUnitTypes = async (filter, options) => {
  const unittypes = await UnitType.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<UnitType>}
 */
const getUnitTypeById = async (id) => {
  return UnitType.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<UnitType>}
 */
const getUnitTypeByCode = async (code) => {
  return UnitType.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<UnitType>}
 */
const updateUnitTypeById = async (unittypeId, updateBody) => {
  const unittype = await getUnitTypeById(unittypeId);
  if (!unittype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UnitType not found');
  }
  Object.assign(unittype, updateBody);
  await unittype.save();
  return unittype;
};

/**
 * Delete unittype by id
 * @param {ObjectId} unittypeId
 * @returns {Promise<UnitType>}
 */
const deleteUnitTypeById = async (unittypeId) => {
  const unittype = await getUnitTypeById(unittypeId);
  if (!unittype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UnitType not found');
  }
  await unittype.remove();
  return unittype;
};


module.exports = {
  createUnitType,
  queryUnitTypes,
  getUnitTypeById,
  updateUnitTypeById,
  deleteUnitTypeById,
};
