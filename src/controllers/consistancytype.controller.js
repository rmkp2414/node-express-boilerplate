const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { consistancytypeService } = require('../services');


const createConsistancyType = catchAsync(async (req, res) => {
  const consistancytype = await consistancytypeService.createConsistancyType(req.body.values);
  res.status(httpStatus.CREATED).send(consistancytype);
});

const getConsistancyTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await consistancytypeService.queryConsistancyTypes(filter, options);
  res.send(result);
});

const getConsistancyType = catchAsync(async (req, res) => {
  const consistancytype = await consistancytypeService.getConsistancyTypeByCode(req.params.code);
  if (!consistancytype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(consistancytype);
});

const updateConsistancyType = catchAsync(async (req, res) => {
  const consistancytype = await consistancytypeService.updateConsistancyTypeById(req.params.consistancytypeId, req.body);
  res.send(consistancytype);
});

const deleteConsistancyType = catchAsync(async (req, res) => {
  await consistancytypeService.deleteConsistancyTypeById(req.params.consistancytypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createConsistancyType,
  getConsistancyTypes,
  getConsistancyType,
  updateConsistancyType,
  deleteConsistancyType,
};
