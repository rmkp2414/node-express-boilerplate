const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { substancetypeService } = require('../services');


const createSubstanceType = catchAsync(async (req, res) => {
  const substancetype = await substancetypeService.createSubstanceType(req.body.values);
  res.status(httpStatus.CREATED).send(substancetype);
});

const getSubstanceTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await substancetypeService.querySubstanceTypes(filter, options);
  res.send(result);
});

const getSubstanceType = catchAsync(async (req, res) => {
  const substancetype = await substancetypeService.getSubstanceTypeByCode(req.params.code);
  if (!substancetype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(substancetype);
});

const updateSubstanceType = catchAsync(async (req, res) => {
  const substancetype = await substancetypeService.updateSubstanceTypeById(req.params.substancetypeId, req.body);
  res.send(substancetype);
});

const deleteSubstanceType = catchAsync(async (req, res) => {
  await substancetypeService.deleteSubstanceTypeById(req.params.substancetypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSubstanceType,
  getSubstanceTypes,
  getSubstanceType,
  updateSubstanceType,
  deleteSubstanceType,
};
