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
  const { filename: image } = req.file;

  await sharp(req.file.path)
    .resize({ width: 100, height: 100 })
    .png()
    .toFile(path.resolve(req.file.destination, 'resized', image));
  fs.unlinkSync(req.file.path);

  // console.log('req.file.filename', req.file.filename);
  // console.log('lesson._id', req.body.lessonId);
  // console.log('question', req.body.question);
  // const question = {
  //   question: req.body.question,
  //   imageSrc: req.file.fileName,
  // };
  // question.question = req.body.question;
  // question.imageSrc = req.file.filename;

  Lesson.findByIdAndUpdate(req.body.lessonId, {
    $push: {
      question: {
        question: req.body.question,
        imageSrc: req.file.filename,
      },
    },
    { 'new': true},
  );

  // const lesson = await Lesson.findById(req.body.lessonId);

  // if (!lesson.questions) {
  //   lesson.questions = [];
  // }
  // lesson.questions.push(question);
  // lesson.save();

  // return res.redirect('back');

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
