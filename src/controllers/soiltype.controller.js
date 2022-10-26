const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { soiltypeService } = require('../services');


const createSoilType = catchAsync(async (req, res) => {
  const soiltype = await soiltypeService.createSoilType(req.body.values);
  res.status(httpStatus.CREATED).send(soiltype);
});

const getSoilTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await soiltypeService.querySoilTypes(filter, options);
  res.send(result);
});

const getSoilType = catchAsync(async (req, res) => {
  const soiltype = await soiltypeService.getSoilTypeByCode(req.params.code);
  if (!soiltype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(soiltype);
});

const updateSoilType = catchAsync(async (req, res) => {
  const soiltype = await soiltypeService.updateSoilTypeById(req.params.soiltypeId, req.body);
  res.send(soiltype);
});

const deleteSoilType = catchAsync(async (req, res) => {
  await soiltypeService.deleteSoilTypeById(req.params.soiltypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSoilType,
  getSoilTypes,
  getSoilType,
  updateSoilType,
  deleteSoilType,
};
