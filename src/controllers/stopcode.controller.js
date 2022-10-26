const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stopcodeService,fileService } = require('../services');


const createStopCode = catchAsync(async (req, res) => {
  const stopcode = await stopcodeService.createStopCode(req.body.values);
  res.status(httpStatus.CREATED).send(stopcode);
});

const getStopCodes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await stopcodeService.queryStopCodes(filter, options);
  res.send(result);
});

const getStopCode = catchAsync(async (req, res) => {
  const stopcode = await stopcodeService.getStopCodeByCode(req.params.code);
  if (!stopcode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(stopcode);
});

const updateStopCode = catchAsync(async (req, res) => {
  const stopcode = await stopcodeService.updateStopCodeById(req.params.stopcodeId, req.body);
  res.send(stopcode);
});

const deleteStopCode = catchAsync(async (req, res) => {
  await stopcodeService.deleteStopCodeById(req.params.stopcodeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStopCode,
  getStopCodes,
  getStopCode,
  updateStopCode,
  deleteStopCode,
};
