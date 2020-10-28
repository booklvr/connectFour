/* eslint-disable */

// import '@babel/polyfill';
// polyfill for es6
import "core-js/stable";
import 'classlist-polyfill';

// polyfill for fetch
import 'isomorphic-fetch';
// pollyfill for .remove()
import 'element-remove';

import "regenerator-runtime/runtime";
import '../sass/main.scss';

import('./onStart/onStartController').then();

const loginPage = document.getElementById('main-login');
if (loginPage) {
  import('./login/loginController').then();
}

const registerPage = document.getElementById('main-register');
if (registerPage) {
  import('./register/registerController').then();
}

const forgotPasswordPage = document.getElementById('main-forgot-password');
if (forgotPasswordPage) {
  import('./forgotPassword/forgotPasswordController').then();
}

const resetPasswordPage = document.getElementById('main-reset-password');
if (resetPasswordPage) {
  import('./resetPassword/resetPasswordController').then();
}

const updateUserPage = document.getElementById('main-update-user');
if (updateUserPage) {
  import('./updateUser/updateUserController').then();
}

const connectFourPage = document.getElementById('connect-four');
if (connectFourPage) {
  import('./connectFour/connectFourController').then();
}

const addLessonPage = document.getElementById('main-addLesson');
if (addLessonPage) {
  import('./addLesson/addLessonController').then();
}

const lessonPage = document.getElementById('main-lesson');
if (lessonPage) {
  import('./lesson/lessonController').then();
}