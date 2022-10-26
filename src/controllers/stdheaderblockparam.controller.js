const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stdheaderblockparamService } = require('../services');


const createStdHeaderBlockParam = catchAsync(async (req, res) => {
  const stdheaderblockparam = await stdheaderblockparamService.createStdHeaderBlockParam(req.body.values);
  res.status(httpStatus.CREATED).send(stdheaderblockparam);
});

const getStdHeaderBlockParams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await stdheaderblockparamService.queryStdHeaderBlockParams(filter, options);
  res.send(result);
});

const getStdHeaderBlockParam = catchAsync(async (req, res) => {
  const stdheaderblockparam = await stdheaderblockparamService.getStdHeaderBlockParamByCode(req.params.code);
  if (!stdheaderblockparam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(stdheaderblockparam);
});

const updateStdHeaderBlockParam = catchAsync(async (req, res) => {
  const stdheaderblockparam = await stdheaderblockparamService.updateStdHeaderBlockParamById(req.params.stdheaderblockparamId, req.body);
  res.send(stdheaderblockparam);
});

const deleteStdHeaderBlockParam = catchAsync(async (req, res) => {
  await stdheaderblockparamService.deleteStdHeaderBlockParamById(req.params.stdheaderblockparamId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStdHeaderBlockParam,
  getStdHeaderBlockParams,
  getStdHeaderBlockParam,
  updateStdHeaderBlockParam,
  deleteStdHeaderBlockParam,
};
