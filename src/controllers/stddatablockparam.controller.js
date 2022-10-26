const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { stddatablockparamService } = require('../services');


const createStdDataBlockParam = catchAsync(async (req, res) => {
  const stddatablockparam = await stddatablockparamService.createStdDataBlockParam(req.body.values);
  res.status(httpStatus.CREATED).send(stddatablockparam);
});

const getStdDataBlockParams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await stddatablockparamService.queryStdDataBlockParams(filter, options);
  res.send(result);
});

const getStdDataBlockParam = catchAsync(async (req, res) => {
  const stddatablockparam = await stddatablockparamService.getStdDataBlockParamByCode(req.params.code);
  if (!stddatablockparam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(stddatablockparam);
});

const updateStdDataBlockParam = catchAsync(async (req, res) => {
  const stddatablockparam = await stddatablockparamService.updateStdDataBlockParamById(req.params.stddatablockparamId, req.body);
  res.send(stddatablockparam);
});

const deleteStdDataBlockParam = catchAsync(async (req, res) => {
  await stddatablockparamService.deleteStdDataBlockParamById(req.params.stddatablockparamId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStdDataBlockParam,
  getStdDataBlockParams,
  getStdDataBlockParam,
  updateStdDataBlockParam,
  deleteStdDataBlockParam,
};
