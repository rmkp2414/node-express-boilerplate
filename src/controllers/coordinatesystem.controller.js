const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { coordinatesystemService } = require('../services');


const createCoordinateSystem = catchAsync(async (req, res) => {
  const coordinatesystem = await coordinatesystemService.createCoordinateSystem(req.body);
  res.status(httpStatus.CREATED).send(coordinatesystem);
});

const getCoordinateSystems = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await coordinatesystemService.queryCoordinateSystems(filter, options);
  res.send(result);
});

const getCoordinateSystem = catchAsync(async (req, res) => {
  const coordinatesystem = await coordinatesystemService.getCoordinateSystemByCode(req.params.code);
  if (!coordinatesystem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stop Code not found');
  }
  res.send(coordinatesystem);
});

const updateCoordinateSystem = catchAsync(async (req, res) => {
  const coordinatesystem = await coordinatesystemService.updateCoordinateSystemById(req.params.coordinatesystemId, req.body);
  res.send(coordinatesystem);
});

const deleteCoordinateSystem = catchAsync(async (req, res) => {
  await coordinatesystemService.deleteCoordinateSystemById(req.params.coordinatesystemId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCoordinateSystem,
  getCoordinateSystems,
  getCoordinateSystem,
  updateCoordinateSystem,
  deleteCoordinateSystem,
};
