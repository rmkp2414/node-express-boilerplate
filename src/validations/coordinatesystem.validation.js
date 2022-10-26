const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCoordinateSystem = {
  body: Joi.object().keys({
    coordinatesystem: Joi.string(),
    remarks: Joi.string().required(),
    status:Joi.string().required()
  }),
};

const getCoordinateSystems = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCoordinateSystem = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateCoordinateSystem = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteCoordinateSystem = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCoordinateSystem,
  getCoordinateSystems,
  getCoordinateSystem,
  updateCoordinateSystem,
  deleteCoordinateSystem,
};
