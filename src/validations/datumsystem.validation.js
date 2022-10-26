const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createDatumSystem = {
  body: Joi.object().keys({
    datumsystem: Joi.string().required(),
    remarks: Joi.string().required(),
    status: Joi.string().required(),
  }),
};

const getDatumSystems = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDatumSystem = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateDatumSystem = {
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

const deleteDatumSystem = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDatumSystem,
  getDatumSystems,
  getDatumSystem,
  updateDatumSystem,
  deleteDatumSystem,
};
