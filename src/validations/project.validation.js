const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createAnalysisType = {
  body: Joi.object().keys({
    code: Joi.string().required().email(),
    name: Joi.string().required().custom(password),
    // description: Joi.string().required(),
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getAnalysisTypes = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAnalysisType = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateAnalysisType = {
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

const deleteAnalysisType = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAnalysisType,
  getAnalysisTypes,
  getAnalysisType,
  updateAnalysisType,
  deleteAnalysisType,
};
