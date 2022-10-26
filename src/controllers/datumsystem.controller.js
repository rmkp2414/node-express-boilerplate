const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { datumsystemService } = require('../services');


const createDatumSystem = catchAsync(async (req, res) => {
  const datumsystem = await datumsystemService.createDatumSystem(req.body);
  res.status(httpStatus.CREATED).send(datumsystem);
});

const getDatumSystems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await datumsystemService.queryDatumSystems(filter, options);
  res.send(result);
});

const getDatumSystem = catchAsync(async (req, res) => {
  const datumsystem = await datumsystemService.getDatumSystemByCode(req.params.code);
  if (!datumsystem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(datumsystem);
});

const updateDatumSystem = catchAsync(async (req, res) => {
  const datumsystem = await datumsystemService.updateDatumSystemById(req.params.datumsystemId, req.body);
  res.send(datumsystem);
});

const deleteDatumSystem = catchAsync(async (req, res) => {
  await datumsystemService.deleteDatumSystemById(req.params.datumsystemId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDatumSystem,
  getDatumSystems,
  getDatumSystem,
  updateDatumSystem,
  deleteDatumSystem,
};
