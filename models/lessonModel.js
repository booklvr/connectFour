const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
// const validator = require('validator');
// const crypto = require('crypto');

const LessonSchema = new mongoose.Schema(
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
      trim: true,
    },
    target: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    },
    questions: [
      {
        question: {
          type: String,
          trim: true,
        },
        imageSrc: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Lesson', LessonSchema);
