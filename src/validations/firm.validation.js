const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

// firmtype: '', firmname: '', registrationnumber: '', address: '', email: '', mobile: 
// '', contactperson: '', website: '', taxnumber: '', numberofusers: '', status: ''
const createFirm = {
  body: Joi.object().keys({
    firmtype: Joi.number().required(),
    firmname: Joi.string().required(),
    registrationnumber: Joi.string().required(),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    contactperson: Joi.string().required(),
    website: Joi.string().required(),
    taxnumber: Joi.string().required(),
    numberofusers: Joi.string().required(),
    firmstatus: Joi.required(),
  }),
};

const getFirms = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getFirm = {
  params: Joi.object().keys({
    firmId: Joi.string().custom(objectId),
  }),
};

const updateFirm = {
  params: Joi.object().keys({
    firmId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        firmtype: Joi.number().required(),
        firmname: Joi.string().required(),
        registrationnumber: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required(),
        contactperson: Joi.string().required(),
        website: Joi.string().required(),
        taxnumber: Joi.string().required(),
        numberofusers: Joi.string().required(),
        firmstatus: Joi.required(),
    })
    .min(1),
};

const deleteFirm = {
  params: Joi.object().keys({
    firmId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFirm,
  getFirms,
  getFirm,
  updateFirm,
  deleteFirm,
};
