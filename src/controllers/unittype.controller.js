const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { unittypeService } = require('../services');


const createUnitType = catchAsync(async (req, res) => {
  const unittype = await unittypeService.createUnitType(req.body.values);
  res.status(httpStatus.CREATED).send(unittype);
});

const getUnitTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await unittypeService.queryUnitTypes(filter, options);
  res.send(result);
});

const getUnitType = catchAsync(async (req, res) => {
  const unittype = await unittypeService.getUnitTypeByCode(req.params.code);
  if (!unittype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(unittype);
});

const updateUnitType = catchAsync(async (req, res) => {
  const unittype = await unittypeService.updateUnitTypeById(req.params.unittypeId, req.body);
  res.send(unittype);
});

const deleteUnitType = catchAsync(async (req, res) => {
  await unittypeService.deleteUnitTypeById(req.params.unittypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUnitType,
  getUnitTypes,
  getUnitType,
  updateUnitType,
  deleteUnitType,
};
