/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const loginUI = (function () {
  const DOMStrings = {
    // BY CLASS
    // BY ID
    email: '#email',
    password: '#password',
    submitLoginBtn: '#submit-login-btn',
  };

  const DOM = {
    email: document.querySelector(DOMStrings.email),
    password: document.querySelector(DOMStrings.password),
  };

  // HELPER FUNCTIONS

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    login: async function (e) {
      e.preventDefault();
      console.log('LOGIN FRONTEND()');

      try {
        const res = await axios({
          method: 'POST',
          url: '/api/v1/auth/login',
          data: {
            email: DOM.email.value,
            password: DOM.password.value,
          },
        });

        if (res.data.status === 'success') {
          showAlert('success', 'login successful');
          window.setTimeout(() => {
            location.assign('/my-saved-games');
          }, 1000);
        } else if (
          res.data.status === 'fail' &&
          res.data.data.data === 'not-verified'
        ) {
          showAlert('error', 'login failed, account has not been verified');
          window.setTimeout(() => {
            location.assign('/confirm-verification');
          }, 2000);
        } else {
          DOM.password.value = '';
          showAlert('error', 'login failed');
        }
      } catch (err) {
        showAlert('error', err);
        console.log('try catch err', err);
      }
    },
  };
})();

export { loginUI };
