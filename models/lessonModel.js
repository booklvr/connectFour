const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    class: {
      type: String,
    },
    chapter: {
      type: String,
      trim: true
    },
    languageFocus: {
      type: String,
      trim: true,
    },
    // questions: [
    //  {
    //    question: {
    //      type: String,
    //      trim: true,
    //    },
    //    image: {
    //      type: Buffer,
    //    } 
    //  }
    // ]
  },
  {
    timestamps: true,
  },
  // {
  //   toJson: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);


module.exports = mongoose.model('User', UserSchema);
