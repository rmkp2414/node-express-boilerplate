const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const projectSchema = mongoose.Schema(
  {
    firmname: {
      type: String,
      required: true,
      trim: true,
    }, projectstatus: {
      type: String,
      required: true,
      trim: true,
    }, client: {
      type: String,
      required: true,
      trim: true,
    },endclient:{
      type: String,
      required: true,
      trim: true,
    }, projectname: {
      type: String,
      required: true,
      trim: true,
    }, projectnumber: {
      type: String,
      required: true,
      trim: true,
    }, 
    clientprojectnumber:{
      type: String,
      required: true,
      trim: true,
    },country : {
      type: String,
      required: true,
      trim: true,
    }, date: {
      type: String,
      required: true,
      trim: true,
    }, assignmentleader:{
      type: String,
      required: true,
      trim: true,
    }, geotechnicaldesigner: {
      type: String,
      required: true,
      trim: true,
    }, 
    responsiblegeotechnicalengineer: {
      type: String,
      required: true,
      trim: true,
    },cadbimdesigner:{
      type: String,
      required: true,
      trim: true,
    },projectphase:{
      type: String,
      required: true,
      trim: true,
    },coordinatesystem:{
      type: String,
      required: true,
      trim: true,
    },datumsystem:{
      type: String,
      required: true,
      trim: true,
    },
    description:{
      type: String,
      required: true,
      trim: true,
    },internalreviewer:{
      type: String,
      required: true,
      trim: true,
    },externalreviewer:{
      type: String,
      required: true,
      trim: true,
    },propertyunitdesignation:{
      type: String,
      required: true,
      trim: true,
    },
    projectstatus: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 projectSchema.statics.isExistingSoilType = async function (code) {
  const soiltype = await this.findOne({ code });
  return !!soiltype;
};



/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// userSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });


/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
                        
 projectSchema.statics.findByBoreholeName = async function (boreholename) {
  const borehole = await this.findOne({ boreholename });
  // return !!borehole;
  return borehole;
};

/**
 * @typedef User
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
