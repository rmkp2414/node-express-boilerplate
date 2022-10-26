const httpStatus = require('http-status');
const { ClassificationCU } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} classificationcuBody
 * @returns {Promise<ClassificationCU>}
 */
const createClassificationCU = async (classificationcuBody) => {
  if (await ClassificationCU.isAvailable(classificationcuBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return ClassificationCU.create(classificationcuBody);
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
const queryClassificationCUs = async (filter, options) => {
  const classificationcus = await ClassificationCU.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<ClassificationCU>}
 */
const getClassificationCUById = async (id) => {
  return ClassificationCU.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<ClassificationCU>}
 */
const getClassificationCUByCode = async (code) => {
  return ClassificationCU.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<ClassificationCU>}
 */
const updateClassificationCUById = async (classificationcuId, updateBody) => {
  const classificationcu = await getClassificationCUById(classificationcuId);
  if (!classificationcu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassificationCU not found');
  }
  Object.assign(classificationcu, updateBody);
  await classificationcu.save();
  return classificationcu;
};

/**
 * Delete classificationcu by id
 * @param {ObjectId} classificationcuId
 * @returns {Promise<ClassificationCU>}
 */
const deleteClassificationCUById = async (classificationcuId) => {
  const classificationcu = await getClassificationCUById(classificationcuId);
  if (!classificationcu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ClassificationCU not found');
  }
  await classificationcu.remove();
  return classificationcu;
};


module.exports = {
  createClassificationCU,
  queryClassificationCUs,
  getClassificationCUById,
  updateClassificationCUById,
  deleteClassificationCUById,
};
