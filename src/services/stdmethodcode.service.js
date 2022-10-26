const httpStatus = require('http-status');
const { StdMethodCode } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} stdmethodcodeBody
 * @returns {Promise<StdMethodCode>}
 */
const createStdMethodCode = async (stdmethodcodeBody) => {
  if (await StdMethodCode.isAvailable(stdmethodcodeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return StdMethodCode.create(stdmethodcodeBody);
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
const queryStdMethodCodes = async (filter, options) => {
  const stdmethodcodes = await StdMethodCode.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<StdMethodCode>}
 */
const getStdMethodCodeById = async (id) => {
  return StdMethodCode.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<StdMethodCode>}
 */
const getStdMethodCodeByCode = async (code) => {
  return StdMethodCode.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<StdMethodCode>}
 */
const updateStdMethodCodeById = async (stdmethodcodeId, updateBody) => {
  const stdmethodcode = await getStdMethodCodeById(stdmethodcodeId);
  if (!stdmethodcode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StdMethodCode not found');
  }
  Object.assign(stdmethodcode, updateBody);
  await stdmethodcode.save();
  return stdmethodcode;
};

/**
 * Delete stdmethodcode by id
 * @param {ObjectId} stdmethodcodeId
 * @returns {Promise<StdMethodCode>}
 */
const deleteStdMethodCodeById = async (stdmethodcodeId) => {
  const stdmethodcode = await getStdMethodCodeById(stdmethodcodeId);
  if (!stdmethodcode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'StdMethodCode not found');
  }
  await stdmethodcode.remove();
  return stdmethodcode;
};


module.exports = {
  createStdMethodCode,
  queryStdMethodCodes,
  getStdMethodCodeById,
  updateStdMethodCodeById,
  deleteStdMethodCodeById,
};
