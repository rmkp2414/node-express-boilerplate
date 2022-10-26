const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classificationstService } = require('../services');


const createClassificationST = catchAsync(async (req, res) => {
  const classificationst = await classificationstService.createClassificationST(req.body.values);
  res.status(httpStatus.CREATED).send(classificationst);
});

const getClassificationSTs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classificationstService.queryClassificationSTs(filter, options);
  res.send(result);
});

const getClassificationST = catchAsync(async (req, res) => {
  const classificationst = await classificationstService.getClassificationSTByCode(req.params.code);
  if (!classificationst) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(classificationst);
});

const updateClassificationST = catchAsync(async (req, res) => {
  const classificationst = await classificationstService.updateClassificationSTById(req.params.classificationstId, req.body);
  res.send(classificationst);
});

const deleteClassificationST = catchAsync(async (req, res) => {
  await classificationstService.deleteClassificationSTById(req.params.classificationstId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClassificationST,
  getClassificationSTs,
  getClassificationST,
  updateClassificationST,
  deleteClassificationST,
};
