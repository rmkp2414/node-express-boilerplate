const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { countryService } = require('../services');


const createCountry = catchAsync(async (req, res) => {
  const country = await countryService.createCountry(req.body.values);
  res.status(httpStatus.CREATED).send(country);
});

const getCountrys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await countryService.queryCountrys(filter, options);
  res.send(result);
});

const getCountry = catchAsync(async (req, res) => {
  const country = await countryService.getCountryByCode(req.params.code);
  if (!country) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(country);
});

const updateCountry = catchAsync(async (req, res) => {
  const country = await countryService.updateCountryById(req.params.countryId, req.body);
  res.send(country);
});

const deleteCountry = catchAsync(async (req, res) => {
  await countryService.deleteCountryById(req.params.countryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCountry,
  getCountrys,
  getCountry,
  updateCountry,
  deleteCountry,
};
