const httpStatus = require('http-status');
const { ClassificationST } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} classificationstBody
 * @returns {Promise<ClassificationST>}
 */
const createClassificationST = async (classificationstBody) => {
  if (await ClassificationST.isAvailable(classificationstBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return ClassificationST.create(classificationstBody);
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
const queryClassificationSTs = async (filter, options) => {
  const classificationsts = await ClassificationST.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<ClassificationST>}
 */
const getClassificationSTById = async (id) => {
  return ClassificationST.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<ClassificationST>}
 */
const getClassificationSTByCode = async (code) => {
  return ClassificationST.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<ClassificationST>}
 */
const updateClassificationSTById = async (classificationstId, updateBody) => {
  const classificationst = await getClassificationSTById(classificationstId);
  if (!classificationst) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassificationST not found');
  }
  Object.assign(classificationst, updateBody);
  await classificationst.save();
  return classificationst;
};

/**
 * Delete classificationst by id
 * @param {ObjectId} classificationstId
 * @returns {Promise<ClassificationST>}
 */
const deleteClassificationSTById = async (classificationstId) => {
  const classificationst = await getClassificationSTById(classificationstId);
  if (!classificationst) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassificationST not found');
  }
  await classificationst.remove();
  return classificationst;
};


module.exports = {
  createClassificationST,
  queryClassificationSTs,
  getClassificationSTById,
  updateClassificationSTById,
  deleteClassificationSTById,
};
