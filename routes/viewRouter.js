const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getLoginForm);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);

router.get(
  '/register',
  authController.isLoggedIn,
  viewsController.getRegisterForm
);


router.get(
  '/my-saved-games',
  authController.isAuthenticated,
  viewsController.getSavedGames
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

router.get('/my-lessons/:id', authController.isAuthenticated, viewsController.getLesson);

router.get('/connectFour', authController.isAuthenticated, viewsController.connectFour);

module.exports = router;
