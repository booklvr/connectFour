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
  // shrink file size
  const processedImage = await sharp(req.file.buffer)
    .resize({ width: 300, height: 300 })
    .png()
    .toBuffer();

  req.file.processedImage = processedImage;

  const lesson = await Lesson.findById(req.body.lessonId);

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: lesson._id },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.processedImage).pipe(stream);
    });
  };

  const imageData = await streamUpload(req);


  // add Question to lesson question array

  const question = {
    question: req.body.question,
    imageSrc: imageData.url,
    public_id: imageData.public_id,
  };

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
});

exports.deleteImagesFromCloudinary = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);
  if (lesson && lesson.questions.length > 0) {
    cloudinary.api.delete_resources_by_prefix(
      `${lesson._id}/`,
      (error, result) => {
        console.log(result, error);
        cloudinary.api.delete_folder(`${lesson._id}/`, (err, folderResult) => {
          console.log(folderResult, err);
        });
      }
    );
  } else {
    console.log('no images to delete');
  }
  next();
});

exports.deleteImageFromCloudinary = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);
  const question = lesson.questions.id(req.params.questionId);
  

  if (lesson) {
    req.lesson = lesson;
    // console.log('found the question,', lesson);
    cloudinary.uploader.destroy(question.public_id, function (error, result) {
      console.log(result, error);
    });
  } else {
    console.log('no images to delete');
  }
  next();
});

exports.deleteQuestion = catchAsync(async (req, res, next) => {
  
  req.lesson.questions.pull(req.params.questionId);
  req.lesson.save();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.editQuestion = catchAsync(async (req, res, next) => {
  

  const lesson = await Lesson.findById(req.params.id);
  
  const question = lesson.questions.id(req.params.questionId);
  

  question.question = req.body.question;
  await lesson.save();

  res.status(200).json({
    status: 'success',
    data: question,
  });
});

exports.getAllLessons = factory.getAll(Lesson);
exports.getLesson = factory.getOne(Lesson);
exports.createLesson = factory.createOne(Lesson);
// exports.updateLesson = factory.updateOne(Lesson);
exports.deleteLesson = factory.deleteOne(Lesson);
