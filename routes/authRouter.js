const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');
const authController = require('../controllers/authController');

const router = express.Router();
// @desc Auth with Google
// @route GET api/v1/auth/google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

// @desc Google Auth Callback
// @route GET api/v1/auth/google
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '../../../../lessons',
  })
);

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  authController.login
);

router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

router.post(
  '/confirmPassword',
  authController.isAuthenticated,
  authController.confirmPassword
);

router.patch(
  '/updatePassword',
  authController.isAuthenticated,
  authController.updatePassword
);





module.exports = router;
