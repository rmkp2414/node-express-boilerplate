const httpStatus = require('http-status');
const { SubstanceType } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} substancetypeBody
 * @returns {Promise<SubstanceType>}
 */
const createSubstanceType = async (substancetypeBody) => {
  if (await SubstanceType.isAvailable(substancetypeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return SubstanceType.create(substancetypeBody);
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
const querySubstanceTypes = async (filter, options) => {
  const substancetypes = await SubstanceType.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<SubstanceType>}
 */
const getSubstanceTypeById = async (id) => {
  return SubstanceType.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<SubstanceType>}
 */
const getSubstanceTypeByCode = async (code) => {
  return SubstanceType.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<SubstanceType>}
 */
const updateSubstanceTypeById = async (substancetypeId, updateBody) => {
  const substancetype = await getSubstanceTypeById(substancetypeId);
  if (!substancetype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubstanceType not found');
  }
  Object.assign(substancetype, updateBody);
  await substancetype.save();
  return substancetype;
};

/**
 * Delete substancetype by id
 * @param {ObjectId} substancetypeId
 * @returns {Promise<SubstanceType>}
 */
const deleteSubstanceTypeById = async (substancetypeId) => {
  const substancetype = await getSubstanceTypeById(substancetypeId);
  if (!substancetype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubstanceType not found');
  }
  await substancetype.remove();
  return substancetype;
};


module.exports = {
  createSubstanceType,
  querySubstanceTypes,
  getSubstanceTypeById,
  updateSubstanceTypeById,
  deleteSubstanceTypeById,
};
