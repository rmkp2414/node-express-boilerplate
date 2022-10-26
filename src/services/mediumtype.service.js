const httpStatus = require('http-status');
const { MediumType } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} mediumtypeBody
 * @returns {Promise<MediumType>}
 */
const createMediumType = async (mediumtypeBody) => {
  if (await MediumType.isAvailable(mediumtypeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return MediumType.create(mediumtypeBody);
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
const queryMediumTypes = async (filter, options) => {
  const mediumtypes = await MediumType.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<MediumType>}
 */
const getMediumTypeById = async (id) => {
  return MediumType.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<MediumType>}
 */
const getMediumTypeByCode = async (code) => {
  return MediumType.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<MediumType>}
 */
const updateMediumTypeById = async (mediumtypeId, updateBody) => {
  const mediumtype = await getMediumTypeById(mediumtypeId);
  if (!mediumtype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MediumType not found');
  }
  Object.assign(mediumtype, updateBody);
  await mediumtype.save();
  return mediumtype;
};

/**
 * Delete mediumtype by id
 * @param {ObjectId} mediumtypeId
 * @returns {Promise<MediumType>}
 */
const deleteMediumTypeById = async (mediumtypeId) => {
  const mediumtype = await getMediumTypeById(mediumtypeId);
  if (!mediumtype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'MediumType not found');
  }
  await mediumtype.remove();
  return mediumtype;
};


module.exports = {
  createMediumType,
  queryMediumTypes,
  getMediumTypeById,
  updateMediumTypeById,
  deleteMediumTypeById,
};
