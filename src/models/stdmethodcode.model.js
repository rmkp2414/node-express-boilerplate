const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

//file:///C:/Users/KAPILA/Desktop/geomanager%20instructions/SGF%20Report%203_2012E.pdf
//page 29/102 attachment A
const stdmethodcodeSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
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
    group: {
      type: String,
      required: true,
      trim: true,
    },   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stdmethodcodeSchema.plugin(toJSON);
stdmethodcodeSchema.plugin(paginate);

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
                        
 stdmethodcodeSchema.statics.findByBoreholeName = async function (boreholename) {
  const borehole = await this.findOne({ boreholename });
  // return !!borehole;
  return borehole;
};

/**
 * @typedef User
 */
const StdmethodCode = mongoose.model('StdmethodCode', stdmethodcodeSchema);

module.exports = StdmethodCode;
