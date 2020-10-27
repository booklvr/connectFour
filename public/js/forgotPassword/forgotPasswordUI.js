/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const forgotPasswordUI = (function () {
  const DOMStrings = {
    // BY CLASS
    // BY ID
    email: '#email',
    forgotPasswordBtn: '#forgot-password-btn',
    forgotPasswordForm: '#forgot-password-form',
  };

  const DOM = {
    email: document.querySelector(DOMStrings.email),
    forgotPasswordBtn: document.querySelector(DOMStrings.forgotPasswordBtn),
    forgotPasswordForm: document.querySelector(DOMStrings.forgotPasswordForm),
  };

  // HELPER FUNCTIONS

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    forgotPassword: async function (e) {
      e.preventDefault();
      DOM.forgotPasswordBtn.innerText = 'Sending...';
      DOM.forgotPasswordBtn.disabled = true;

      try {
        const res = await axios({
          method: 'POST',
          url: '/api/v1/auth/forgotPassword',
          data: {
            email: DOM.email.value,
          },
        });

        if (res.data.status === 'success') {
          DOM.forgotPasswordForm.remove();
          showAlert(
            'success',
            `Sent password reset link to ${DOM.email.value}.`
          );
          window.setTimeout(() => {
            location.assign('/login');
          }, 3000);
        } else {
          DOM.forgotPasswordBtn.disabled = true;
          DOM.email.value = '';
          DOM.forgotPasswordBtn.innerText = 'Reset Password';
          showAlert(
            'error',
            'There is not an account associated with that email.'
          );
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
        console.log('try catch err', err);
      }
    },
  };
})();

export { forgotPasswordUI };
