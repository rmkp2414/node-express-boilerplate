const httpStatus = require('http-status');
const { AnalysisType,Borehole } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} analysistypeBody
 * @returns {Promise<AnalysisType>}
 */
const createAnalysisType = async (analysistypeBody) => {
  if (await AnalysisType.isAvailable(analysistypeBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return AnalysisType.create(analysistypeBody);
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
const queryAnalysisTypes = async (filter, options) => {
  const analysistypes = await AnalysisType.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<AnalysisType>}
 */
const getAnalysisTypeById = async (id) => {
  return AnalysisType.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<AnalysisType>}
 */
const getAnalysisTypeByCode = async (code) => {
  return AnalysisType.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<AnalysisType>}
 */
const updateAnalysisTypeById = async (analysistypeId, updateBody) => {
  const analysistype = await getAnalysisTypeById(analysistypeId);
  if (!analysistype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AnalysisType not found');
  }
  Object.assign(analysistype, updateBody);
  await analysistype.save();
  return analysistype;
};

/**
 * Delete analysistype by id
 * @param {ObjectId} analysistypeId
 * @returns {Promise<AnalysisType>}
 */
const deleteAnalysisTypeById = async (analysistypeId) => {
  const analysistype = await getAnalysisTypeById(analysistypeId);
  if (!analysistype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AnalysisType not found');
  }
  await analysistype.remove();
  return analysistype;
};


module.exports = {
  createAnalysisType,
  queryAnalysisTypes,
  getAnalysisTypeById,
  updateAnalysisTypeById,
  deleteAnalysisTypeById,
};
