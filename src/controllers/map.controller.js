const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mapService } = require('../services');


const createMap = catchAsync(async (req, res) => {
  const map = await mapService.createMap(req.body.values);
  res.status(httpStatus.CREATED).send(map);
});

const getMaps = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mapService.queryMaps(filter, options);
  res.send(result);
});

const getMap = catchAsync(async (req, res) => {
  const map = await mapService.getMapByCode(req.params.code);
  if (!map) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(map);
});

const updateMap = catchAsync(async (req, res) => {
  const map = await mapService.updateMapById(req.params.mapId, req.body);
  res.send(map);
});

const deleteMap = catchAsync(async (req, res) => {
  await mapService.deleteMapById(req.params.mapId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMap,
  getMaps,
  getMap,
  updateMap,
  deleteMap,
};
