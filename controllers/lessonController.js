// const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const streamifier = require('streamifier');

const Lesson = require('../models/lessonModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { cloudinary } = require('../config/cloudinary');

exports.setLessonOwnership = (req, res, next) => {
  // get user from isLoggedIn middleware
  if (!req.body.owner) req.body.owner = req.user._id;
  next();
};

exports.updateLesson = catchAsync(async (req, res, next) => {
  console.log('you are doing a great job');

  // shrink file size
  const processedImage = await sharp(req.file.buffer)
    .resize({ width: 300, height: 300 })
    .png()
    .toBuffer();

  req.file.processedImage = processedImage;

  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.processedImage).pipe(stream);
    });
  };

  const imageData = await streamUpload(req);

  console.log('returned imageData', imageData);

  const question = {
    question: req.body.question,
    imageSrc: imageData.url,
  };

  const lesson = await Lesson.findById(req.body.lessonId);

  if (!lesson.questions) {
    lesson.questions = [];
  }
  lesson.questions.push(question);
  lesson.save();

  return res.redirect('back');
});

// exports.updateLesson = catchAsync(async (req, res, next) => {
//   console.log(req.file);
//   const { filename: image } = req.file;

//   // add Question to lesson question array

//

//   return res.redirect('back');
// });

exports.getAllLessons = factory.getAll(Lesson);
exports.getLesson = factory.getOne(Lesson);
exports.createLesson = factory.createOne(Lesson);
// exports.updateLesson = factory.updateOne(Lesson);
exports.deleteLesson = factory.deleteOne(Lesson);
