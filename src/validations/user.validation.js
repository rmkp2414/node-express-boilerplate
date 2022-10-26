const Joi = require('joi');
const { password, objectId } = require('./custom.validation');



const createUser = {
  body: Joi.object().keys({
    firmname: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    title:Joi.string().required(),
    userrole: Joi.string().required().valid('user', 'admin','firmadmin'),
    workphone: Joi.string().required(),
    mobile: Joi.string().required(),
    email : Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userstatus: Joi.string().required(),



    // email: Joi.string().required().email(),
    // password: Joi.string().required().custom(password),
    // firstname: Joi.string().required(),
    // role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firmname: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      title:Joi.string().required(),
      role: Joi.string().required().valid('user', 'admin','firmadmin'),
      workphone: Joi.string().required(),
      mobile: Joi.string().required(),
      email : Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      status: Joi.string().required(),
      // email: Joi.string().email(),
      // password: Joi.string().custom(password),
      // name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
