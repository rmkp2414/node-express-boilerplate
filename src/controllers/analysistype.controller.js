const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { analysistypeService } = require('../services');


const createAnalysisType = catchAsync(async (req, res) => {
  const analysistype = await analysistypeService.createAnalysisType(req.body.values);
  res.status(httpStatus.CREATED).send(analysistype);
});

const getAnalysisTypes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await analysistypeService.queryAnalysisTypes(filter, options);
  res.send(result);
});

const getAnalysisType = catchAsync(async (req, res) => {
  const analysistype = await analysistypeService.getAnalysisTypeByCode(req.params.code);
  if (!analysistype) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(analysistype);
});

const updateAnalysisType = catchAsync(async (req, res) => {
  const analysistype = await analysistypeService.updateAnalysisTypeById(req.params.analysistypeId, req.body);
  res.send(analysistype);
});

const deleteAnalysisType = catchAsync(async (req, res) => {
  await analysistypeService.deleteAnalysisTypeById(req.params.analysistypeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAnalysisType,
  getAnalysisTypes,
  getAnalysisType,
  updateAnalysisType,
  deleteAnalysisType,
};
