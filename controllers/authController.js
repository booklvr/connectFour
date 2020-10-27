const passport = require('passport');
const crypto = require('crypto');
const moment = require('moment');

// const mongoose = require('mongoose');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/my-saved-games');
  }
  return next();
};


exports.login = (req, res, next) => {
  console.log('auth controller => login()');
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

exports.verifyToken = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const token = await Token.findOne({ token: hashedToken });

  if (token) {
    const user = await User.findOne({ _id: token._userId });
    req.user = user;
    user.isVerified = true;
    await user.save();
  }

  // ERROR HANDLING NEEDED

  next();
});

exports.logout = (req, res, next) => {
  req.logout();
  res.locals.user = '';

  res.status(200).json({
    status: 'success',
    message: 'successfully logged out',
    data: {
      data: null,
    },
  });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(200).json({
      status: 'failure',
      message: 'There are no accounts with that email',
    });
  }

  // 2)  Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email.  Try again later.'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1)  Get the user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 404));
  }

  // 3)  Confirm that passwords exist and match
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError('Please enter password and password Confirm', 400)
    );
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError('Passwords do not match'), 400);
  }

  // 4) Save the new password
  await user.setPassword(req.body.password);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(201).json({
    status: 'success',
    message: 'password updated successfully',
    data: null,
  });
});

exports.confirmPassword = catchAsync(async (req, res, next) => {
  if (!req.body.password) {
    return next(new AppError('No password entered', 400));
  }

  await req.user.authenticate(req.body.password, (err, thisModel) => {
    if (!thisModel) {
      return next(new AppError('Password Incorrect', 400));
    }
    res.status(200).json({
      status: 'success',
    });
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.confirmPassword) {
    return next(
      new AppError('Please enter password and password Confirm', 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError('Passwords do not match'), 400);
  }

  const user = await User.findById(req.user._id);

  await user.setPassword(req.body.password);
  await user.save();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
