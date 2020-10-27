// const passport = require('passport');
const User = require('../models/userModel');
const Lesson = require('../models/lessonModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// exports.setLessonOwnership = (req, res, next) => {
//   // get user from isLoggedIn middleware
//   if (!req.body.owner) req.body.owner = req.user._id;
//   next();
// };



exports.getAllLessons = factory.getAll(Lesson);
exports.getLesson = factory.getOne(Lesson);
exports.createLesson = factory.createOne(Lesson);
exports.updateLesson = factory.updateOne(Lesson);
exports.deleteLesson = factory.deleteOne(Lesson);
