const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stdmethodcodeService } = require('../services');


const createStdMethodCode = catchAsync(async (req, res) => {
  const stdmethodcode = await stdmethodcodeService.createStdMethodCode(req.body.values);
  res.status(httpStatus.CREATED).send(stdmethodcode);
});

const getStdMethodCodes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await stdmethodcodeService.queryStdMethodCodes(filter, options);
  res.send(result);
});

const getStdMethodCode = catchAsync(async (req, res) => {
  const stdmethodcode = await stdmethodcodeService.getStdMethodCodeByCode(req.params.code);
  if (!stdmethodcode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(stdmethodcode);
});

const updateStdMethodCode = catchAsync(async (req, res) => {
  const stdmethodcode = await stdmethodcodeService.updateStdMethodCodeById(req.params.stdmethodcodeId, req.body);
  res.send(stdmethodcode);
});

const deleteStdMethodCode = catchAsync(async (req, res) => {
  await stdmethodcodeService.deleteStdMethodCodeById(req.params.stdmethodcodeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStdMethodCode,
  getStdMethodCodes,
  getStdMethodCode,
  updateStdMethodCode,
  deleteStdMethodCode,
};
