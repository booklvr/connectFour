// const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Lesson = require('../models/lessonModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setLessonOwnership = (req, res, next) => {
  // get user from isLoggedIn middleware
  if (!req.body.owner) req.body.owner = req.user._id;
  next();
};

exports.updateLesson = catchAsync(async (req, res, next) => {
  console.log(req.file);
  const { filename: image } = req.file;

  await sharp(req.file.path)
    .resize({ width: 100, height: 100 })
    .png()
    .toFile(path.resolve(req.file.destination, 'resized', image));
  fs.unlinkSync(req.file.path);

  // add Question to lesson question array

  const question = {
    question: req.body.question,
    imageSrc: req.file.filename,
  };

  const lesson = await Lesson.findById(req.body.lessonId);

  if (!lesson.questions) {
    lesson.questions = [];
  }
  lesson.questions.push(question);
  lesson.save();

  // Lesson.findByIdAndUpdate(
  //   req.body.lessonId,
  //   {
  //     $push: {
  //       questions: {
  //         question: req.body.question,
  //         imageSrc: req.file.filename,
  //       },
  //     },
  //   },
  //   { safe: true, upsert: true }
  // );

  return res.redirect('back');

  // res.status(200).json({
  //   status: 'success',

  //   data: {
  //     data: buffer,
  //   },
  // });
});

exports.getAllLessons = factory.getAll(Lesson);
exports.getLesson = factory.getOne(Lesson);
exports.createLesson = factory.createOne(Lesson);
// exports.updateLesson = factory.updateOne(Lesson);
exports.deleteLesson = factory.deleteOne(Lesson);
