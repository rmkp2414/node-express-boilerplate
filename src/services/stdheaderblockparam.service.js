const httpStatus = require('http-status');
const { StdHeaderBlockParam } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} stdheaderblockparamBody
 * @returns {Promise<StdHeaderBlockParam>}
 */
const createStdHeaderBlockParam = async (stdheaderblockparamBody) => {
  if (await StdHeaderBlockParam.isAvailable(stdheaderblockparamBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return StdHeaderBlockParam.create(stdheaderblockparamBody);
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
const queryStdHeaderBlockParams = async (filter, options) => {
  const stdheaderblockparams = await StdHeaderBlockParam.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<StdHeaderBlockParam>}
 */
const getStdHeaderBlockParamById = async (id) => {
  return StdHeaderBlockParam.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<StdHeaderBlockParam>}
 */
const getStdHeaderBlockParamByCode = async (code) => {
  return StdHeaderBlockParam.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<StdHeaderBlockParam>}
 */
const updateStdHeaderBlockParamById = async (stdheaderblockparamId, updateBody) => {
  const stdheaderblockparam = await getStdHeaderBlockParamById(stdheaderblockparamId);
  if (!stdheaderblockparam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StdHeaderBlockParam not found');
  }
  Object.assign(stdheaderblockparam, updateBody);
  await stdheaderblockparam.save();
  return stdheaderblockparam;
};

/**
 * Delete stdheaderblockparam by id
 * @param {ObjectId} stdheaderblockparamId
 * @returns {Promise<StdHeaderBlockParam>}
 */
const deleteStdHeaderBlockParamById = async (stdheaderblockparamId) => {
  const stdheaderblockparam = await getStdHeaderBlockParamById(stdheaderblockparamId);
  if (!stdheaderblockparam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StdHeaderBlockParam not found');
  }
  await stdheaderblockparam.remove();
  return stdheaderblockparam;
};


module.exports = {
  createStdHeaderBlockParam,
  queryStdHeaderBlockParams,
  getStdHeaderBlockParamById,
  updateStdHeaderBlockParamById,
  deleteStdHeaderBlockParamById,
};
