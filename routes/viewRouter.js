const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getLanding);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);

router.get(
  '/register',
  authController.isLoggedIn,
  viewsController.getRegisterForm
);

router.get(
  '/lessons',
  authController.isAuthenticated,
  viewsController.getLessons
);

router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewsController.forgotPassword
);

router.get('/resetPassword/:token', viewsController.resetPassword);

router.get(
  '/updateUser',
  authController.isAuthenticated,
  viewsController.updateUser
);

router.get(
  '/addLesson',
  authController.isAuthenticated,
  viewsController.addLesson
);

router.get(
  '/lessons/:id',
  authController.isAuthenticated,
  viewsController.getLesson
);

router.get(
  '/connectFour/:id',
  // authController.isAuthenticated,
  viewsController.connectFour
);

router.get('/searchLessons', viewsController.searchLessons);
module.exports = router;
