const httpStatus = require('http-status');
const { Firm } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} firmBody
 * @returns {Promise<Firm>}
 */
const createFirm = async (firmBody) => {
  // if (await Firm.isExistingFirm(firmBody.code)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Firm Already Available in DB');
  // }
  return Firm.create(firmBody);
};

/**
 * Query for firms type
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFirms = async (filter, options) => {
  const firms = await Firm.paginate(filter, options);
  // if(filter.role == 'user'){
  //   firms = firms.filter(f=>{
  //     return f.id == filter.user.firmId
  //   })
  // }
  return firms;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<Firm>}
 */
const getFirmById = async (id) => {
  return Firm.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<Firm>}
 */
const getFirmByCode = async (code) => {
  return Firm.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<Firm>}
 */
const updateFirmById = async (firmId, updateBody) => {
  const firm = await getFirmById(firmId);
  if (!firm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Firm not found');
  }
  Object.assign(firm, updateBody);
  await firm.save();
  return firm;
};

/**
 * Delete firm by id
 * @param {ObjectId} firmId
 * @returns {Promise<Firm>}
 */
const deleteFirmById = async (firmId) => {
  const firm = await getFirmById(firmId);
  if (!firm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Firm not found');
  }
  await firm.remove();
  return firm;
};


module.exports = {
  createFirm,
  queryFirms,
  getFirmById,
  updateFirmById,
  deleteFirmById,
};
