const express = require('express');
const lessonController = require('../controllers/lessonController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.isLoggedIn, lessonController.getAllLessons)
  .post(
    authController.isAuthenticated,
    // classroomController.setClassroomOwnerId,
    lessonController.createLesson
  );

router
  .route('/:id')
  .get(authController.isAuthenticated, lessonController.getLesson)
  .patch(authController.isAuthenticated, lessonController.updateLesson)
  .delete(authController.isAuthenticated, lessonController.deleteLesson);

module.exports = router;
