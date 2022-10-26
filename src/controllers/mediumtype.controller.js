const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mediumtypeService } = require('../services');


const createMediumType = catchAsync(async (req, res) => {
  const mediumtype = await mediumtypeService.createMediumType(req.body.values);
  res.status(httpStatus.CREATED).send(mediumtype);
});

const getMediumTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mediumtypeService.queryMediumTypes(filter, options);
  res.send(result);
});

const getMediumType = catchAsync(async (req, res) => {
  const mediumtype = await mediumtypeService.getMediumTypeByCode(req.params.code);
  if (!mediumtype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(mediumtype);
});

const updateMediumType = catchAsync(async (req, res) => {
  const mediumtype = await mediumtypeService.updateMediumTypeById(req.params.mediumtypeId, req.body);
  res.send(mediumtype);
});

const deleteMediumType = catchAsync(async (req, res) => {
  await mediumtypeService.deleteMediumTypeById(req.params.mediumtypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMediumType,
  getMediumTypes,
  getMediumType,
  updateMediumType,
  deleteMediumType,
};
