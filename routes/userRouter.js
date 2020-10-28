const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// @desc Register a new user with form
// @route POST /api/v1/auth/register
router.post('/', authController.isLoggedIn, userController.register);

router.use(authController.isAuthenticated, userController.getUserId);

router
  .route('/')
  .patch(userController.getUserId, userController.updateUser)
  .delete(userController.getUserId, userController.deleteUser);



module.exports = router;
