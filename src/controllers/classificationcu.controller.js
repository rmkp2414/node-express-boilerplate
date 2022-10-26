const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classificationcuService } = require('../services');


const createClassificationCU = catchAsync(async (req, res) => {
  const classificationcu = await classificationcuService.createClassificationCU(req.body.values);
  res.status(httpStatus.CREATED).send(classificationcu);
});

const getClassificationCUs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classificationcuService.queryClassificationCUs(filter, options);
  res.send(result);
});

const getClassificationCU = catchAsync(async (req, res) => {
  const classificationcu = await classificationcuService.getClassificationCUByCode(req.params.code);
  if (!classificationcu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(classificationcu);
});

const updateClassificationCU = catchAsync(async (req, res) => {
  const classificationcu = await classificationcuService.updateClassificationCUById(req.params.classificationcuId, req.body);
  res.send(classificationcu);
});

const deleteClassificationCU = catchAsync(async (req, res) => {
  await classificationcuService.deleteClassificationCUById(req.params.classificationcuId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClassificationCU,
  getClassificationCUs,
  getClassificationCU,
  updateClassificationCU,
  deleteClassificationCU,
};
