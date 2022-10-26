const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { firmService } = require('../services');


const createFirm = catchAsync(async (req, res) => {
  const firm = await firmService.createFirm(req.body);
  res.status(httpStatus.CREATED).send(firm);
});

const getFirms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await firmService.queryFirms(filter, options);
  res.send(result);
});

const getFirm = catchAsync(async (req, res) => {
  const firm = await firmService.getFirmByCode(req.params.code);
  if (!firm) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(firm);
});

const updateFirm = catchAsync(async (req, res) => {
  const firm = await firmService.updateFirmById(req.params.firmId, req.body);
  res.send(firm);
});

const deleteFirm = catchAsync(async (req, res) => {
  await firmService.deleteFirmById(req.params.firmId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFirm,
  getFirms,
  getFirm,
  updateFirm,
  deleteFirm,
};
