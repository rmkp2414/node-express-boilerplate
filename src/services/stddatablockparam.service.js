const httpStatus = require('http-status');
const { StdDataBlockParam } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} stddatablockparamBody
 * @returns {Promise<StdDataBlockParam>}
 */
const createStdDataBlockParam = async (stddatablockparamBody) => {
  if (await StdDataBlockParam.isAvailable(stddatablockparamBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return StdDataBlockParam.create(stddatablockparamBody);
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
const queryStdDataBlockParams = async (filter, options) => {
  const stddatablockparams = await StdDataBlockParam.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<StdDataBlockParam>}
 */
const getStdDataBlockParamById = async (id) => {
  return StdDataBlockParam.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<StdDataBlockParam>}
 */
const getStdDataBlockParamByCode = async (code) => {
  return StdDataBlockParam.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<StdDataBlockParam>}
 */
const updateStdDataBlockParamById = async (stddatablockparamId, updateBody) => {
  const stddatablockparam = await getStdDataBlockParamById(stddatablockparamId);
  if (!stddatablockparam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StdDataBlockParam not found');
  }
  Object.assign(stddatablockparam, updateBody);
  await stddatablockparam.save();
  return stddatablockparam;
};

/**
 * Delete stddatablockparam by id
 * @param {ObjectId} stddatablockparamId
 * @returns {Promise<StdDataBlockParam>}
 */
const deleteStdDataBlockParamById = async (stddatablockparamId) => {
  const stddatablockparam = await getStdDataBlockParamById(stddatablockparamId);
  if (!stddatablockparam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StdDataBlockParam not found');
  }
  await stddatablockparam.remove();
  return stddatablockparam;
};


module.exports = {
  createStdDataBlockParam,
  queryStdDataBlockParams,
  getStdDataBlockParamById,
  updateStdDataBlockParamById,
  deleteStdDataBlockParamById,
};
