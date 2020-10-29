const crypto = require('crypto');
const User = require('../models/userModel');
const Lesson = require('../models/lessonModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getRegisterForm = (req, res) => {
  res.status(200).render('register', {
    title: 'Register an account',
  });
};

exports.forgotPassword = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot Password',
  });
};

exports.resetPassword = catchAsync(async (req, res) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  let token = {};

  if (user) {
    token = {
      token: req.params.token,
      valid: true,
      expires: user.passwordResetExpires,
    };
  } else {
    token = {
      valid: false,
    };
  }

  res.status(200).render('resetPassword', {
    title: 'Reset Password',
    token,
    moment: require('moment'),
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+googleId');

  res.status(200).render('updateUser', {
    title: 'Settings',
    user,
  });
});

exports.getLessons = async (req, res) => {
  let user = await User.findById(req.user._id);
  console.log('user', user);

  user = await user
    .populate({
      path: 'lessons',
    })
    .execPopulate();

  console.log(user.lessons);
  console.log(user);

  res.status(200).render('lessons', {
    title: 'Lessons',
    lessons: user.lessons,
  });
};

exports.addLesson = (req, res) => {
  res.status(200).render('addLesson', {
    title: 'Add Lesson',
  });
};

exports.connectFour = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  res.status(200).render('connectFour', {
    title: 'connectFour',
    lesson,
  });
});

exports.getLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  console.log(lesson);

  res.status(200).render('lesson', {
    lesson: lesson,
  });
});
