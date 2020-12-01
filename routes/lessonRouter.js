const express = require('express');
// const multer = require('multer');
const lessonController = require('../controllers/lessonController');
const authController = require('../controllers/authController');
const upload = require('../middleware/multer');

const router = express.Router();

router
  .route('/')
  .get(lessonController.getAllLessons)
  .post(
    authController.isAuthenticated,
    lessonController.setLessonOwnership,
    lessonController.createLesson
  );

router
  .route('/:id')
  .get(authController.isAuthenticated, lessonController.getLesson)
  // .post(authController.isAuthenticated, lessonController.updateLesson)
  .post(
    authController.isAuthenticated,
    upload.single('uploadImage'),
    lessonController.updateLesson
  )
  .delete(
    authController.isAuthenticated,
    lessonController.deleteImagesFromCloudinary,
    lessonController.deleteLesson
  );

router
  .route('/:id/:questionId')
  .delete(
    authController.isAuthenticated,
    lessonController.deleteImageFromCloudinary,
    lessonController.deleteQuestion
  )
  .patch(authController.isAuthenticated, lessonController.editQuestion);

module.exports = router;
