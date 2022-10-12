const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const stopcodeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    abbriviation: {
      type: String,
      required: true,
      trim: true,
    },
    remarks: {
      type: String,
      required: true,
      trim: true,
    },
    // status: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stopcodeSchema.plugin(toJSON);
stopcodeSchema.plugin(paginate);

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
stopcodeSchema.statics.isExistingStopCode = async function (code) {
  const stopcode = await this.findOne({ code });
  return !!stopcode;
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
                        
 stopcodeSchema.statics.findByBoreholeName = async function (boreholename) {
  const borehole = await this.findOne({ boreholename });
  // return !!borehole;
  return borehole;
};

/**
 * @typedef User
 */
const StopCode = mongoose.model('StopCode', stopcodeSchema);

module.exports = StopCode;
