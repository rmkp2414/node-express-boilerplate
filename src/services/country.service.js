const httpStatus = require('http-status');
const { Country } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an analysis type
 * @param {Object} countryBody
 * @returns {Promise<Country>}
 */
const createCountry = async (countryBody) => {
  if (await Country.isAvailable(countryBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Analysis Type Already Available in DB');
  }
  return Country.create(countryBody);
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
const queryCountrys = async (filter, options) => {
  const countrys = await Country.paginate(filter, options);
  return analystypes;
};

/**
 * Get analysis type by id
 * @param {ObjectId} id
 * @returns {Promise<Country>}
 */
const getCountryById = async (id) => {
  return Country.findById(id);
};

/**
 * Get analysis type by code
 * @param {string} code
 * @returns {Promise<Country>}
 */
const getCountryByCode = async (code) => {
  return Country.findOne({ code });
};

/**
 * Update analysis type by id
 * @param {ObjectId} analysis
 * @param {Object} updateBody
 * @returns {Promise<Country>}
 */
const updateCountryById = async (countryId, updateBody) => {
  const country = await getCountryById(countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  Object.assign(country, updateBody);
  await country.save();
  return country;
};

/**
 * Delete country by id
 * @param {ObjectId} countryId
 * @returns {Promise<Country>}
 */
const deleteCountryById = async (countryId) => {
  const country = await getCountryById(countryId);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Country not found');
  }
  await country.remove();
  return country;
};


module.exports = {
  createCountry,
  queryCountrys,
  getCountryById,
  updateCountryById,
  deleteCountryById,
};
