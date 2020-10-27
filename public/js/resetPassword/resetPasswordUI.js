/* eslint-disable */
import axios from 'axios';

import { showAlert } from '../alert';


const resetPasswordUI = (function () {
  const DOMStrings = {
    // BY CLASS
    // BY ID
    password: '#password',
    passwordConfirm: '#password-confirm',
    resetPasswordBtn: '#reset-password-btn',
    passwordResetForm: '#password-reset-form',
  };

  const DOM = {
    password: document.querySelector(DOMStrings.password),
    passwordConfirm: document.querySelector(DOMStrings.passwordConfirm),
    passwordResetForm: document.querySelector(DOMStrings.passwordResetForm),
  };

  // HELPER FUNCTIONS

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    resetPassword: async function (e) {
      e.preventDefault();

      try {
        const res = await axios({
          method: 'PATCH',
          url: `/api/v1/auth/resetPassword/${DOM.passwordResetForm.dataset.token}`,
          data: {
            password: DOM.password.value,
            passwordConfirm: DOM.passwordConfirm.value,
          },
        });

        if (res.data.status === 'success') {
          console.log('password reset successfully');
          showAlert('success', 'Password successfully reset.');
          window.setTimeout(() => {
            location.assign('/login');
          }, 3000);
        } else {
          DOM.password.value = '';
          DOM.passwordConfirm.value = '';
          console.log('Password Reset Failed.');
          showAlert('error', 'Password Reset Failed.');
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
        console.log('try catch err', err);
      }
    },
  };
})();

export { resetPasswordUI };
