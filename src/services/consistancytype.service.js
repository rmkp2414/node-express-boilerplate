const httpStatus = require('http-status');
const { ConsistancyType } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} consistancytypeBody
 * @returns {Promise<ConsistancyType>}
 */
const createConsistancyType = async (consistancytypeBody) => {
  if (await ConsistancyType.isAvailable(consistancytypeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return ConsistancyType.create(consistancytypeBody);
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
const queryConsistancyTypes = async (filter, options) => {
  const consistancytypes = await ConsistancyType.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<ConsistancyType>}
 */
const getConsistancyTypeById = async (id) => {
  return ConsistancyType.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<ConsistancyType>}
 */
const getConsistancyTypeByCode = async (code) => {
  return ConsistancyType.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<ConsistancyType>}
 */
const updateConsistancyTypeById = async (consistancytypeId, updateBody) => {
  const consistancytype = await getConsistancyTypeById(consistancytypeId);
  if (!consistancytype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ConsistancyType not found');
  }
  Object.assign(consistancytype, updateBody);
  await consistancytype.save();
  return consistancytype;
};

/**
 * Delete consistancytype by id
 * @param {ObjectId} consistancytypeId
 * @returns {Promise<ConsistancyType>}
 */
const deleteConsistancyTypeById = async (consistancytypeId) => {
  const consistancytype = await getConsistancyTypeById(consistancytypeId);
  if (!consistancytype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ConsistancyType not found');
  }
  await consistancytype.remove();
  return consistancytype;
};


module.exports = {
  createConsistancyType,
  queryConsistancyTypes,
  getConsistancyTypeById,
  updateConsistancyTypeById,
  deleteConsistancyTypeById,
};
