const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');




const firmSchema = mongoose.Schema(
  {
    firmtype: {
      type: Number,
      required: true,
      trim: true,
    },
    firmname: {
      type: String,
      required: true,
      trim: true,
    },
    registrationnumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },    
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    contactperson: {
      type: String,
      required: true,
      trim: true,
    },
    taxnumber: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    numberofusers: {
      type: String,
      required: true,
      trim: true,
    },
    firmstatus: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
firmSchema.plugin(toJSON);
firmSchema.plugin(paginate);

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
 firmSchema.statics.isExistingFirm = async function (id) {
  const firm = await this.findOne({ id });
  return !!dr;
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
                        
//  firmSchema.statics.findByBoreholeName = async function (boreholename) {
//   const borehole = await this.findOne({ boreholename });
//   // return !!borehole;
//   return borehole;
// };

/**
 * @typedef User
 */
const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;
