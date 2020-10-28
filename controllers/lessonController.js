// const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const Lesson = require('../models/lessonModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sharp = require('sharp');
const router = require('../routes/lessonRouter');


exports.setLessonOwnership = (req, res, next) => {
  // get user from isLoggedIn middleware
  if (!req.body.owner) req.body.owner = req.user._id;
  next();
};

exports.updateLesson = catchAsync(async(req, res, next ) => {
  console.log('fuck yeah we made it');

  const {filename: image} = req.file

  await sharp(req.file.path)
    .resize({width: 100, height: 100})
    .png()
    .toFile(
      path.resolve(req.file.destination, 'resized', image)
    )
    fs.unlinkSync(req.file.path);

  // const writeStream = fs.createWriteStream('./dist/img/uploads');

  // const buffer = await sharp(req.file.buffer).resize({ width: 100, height: 100 }).png().toBuffer();

  // buffer.pipe(writeStream);

  
  // write file to file system


  // save img source in database


  const question = req.body.question;
  console.log('question', question);

  req.on('end', () => {
    res.status(200).json({
      status:'success',
      data: {
        data: 'fuck yeah'
      }
    })
  })

  // res.status(200).json({
  //   status: 'success',
    
  //   data: {
  //     data: buffer,
  //   },
  // });

 
})

exports.getAllLessons = factory.getAll(Lesson);
exports.getLesson = factory.getOne(Lesson);
exports.createLesson = factory.createOne(Lesson);
// exports.updateLesson = factory.updateOne(Lesson);
exports.deleteLesson = factory.deleteOne(Lesson);


