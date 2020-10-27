/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const updateUserUI = (function () {
  const DOMStrings = {
    // BY CLASS
    // BY ID
    displayName: '#display-name',
    currentPassword: '#current-password',
    password: '#password',
    confirmPassword: '#confirm-password',
    submitUpdateUserBtn: '#submit-update-user-btn',
    submitConfirmPasswordBtn: '#submit-confirm-password-btn',
    submitUpdatePasswordBtn: '#submit-update-password-btn',
    formConfirmPassword: '#form-confirm-password',
    formUpdatePassword: '#form-update-password',
    deleteUserBtn: '#delete-user-btn',
  };

  const DOM = {
    displayName: document.querySelector(DOMStrings.displayName),
    currentPassword: document.querySelector(DOMStrings.currentPassword),
    password: document.querySelector(DOMStrings.password),
    confirmPassword: document.querySelector(DOMStrings.confirmPassword),
    formConfirmPassword: document.querySelector(DOMStrings.formConfirmPassword),
    formUpdatePassword: document.querySelector(DOMStrings.formUpdatePassword),
  };

  // HELPER FUNCTIONS

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    updateUser: async (e) => {
      e.preventDefault();

      try {
        const res = await axios({
          method: 'PATCH',
          url: '/api/v1/users/',
          data: {
            displayName: DOM.displayName.value,
          },
        });

        if (res.data.status === 'success') {
          DOM.displayName.value = '';
          showAlert('success', 'Update Successful');
          window.setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          showAlert('error', 'Update Failed');
        }
      } catch (err) {
        showAlert('error', 'Error Updating User');
        console.log('try catch err', err);
      }
    },
    confirmPassword: async (e) => {
      e.preventDefault();

      try {
        const res = await axios({
          method: 'POST',
          url: '/api/v1/auth/confirmPassword',
          data: {
            password: DOM.currentPassword.value,
          },
        });

        if (res.data.status === 'success') {
          showAlert('success', 'Password Correct');
          DOM.formConfirmPassword.classList.toggle('hidden');
          DOM.formUpdatePassword.classList.toggle('hidden');
        } else {
          console.log('Could not Authenticate User');
          showAlert('error', 'Password Incorrect');
        }
      } catch (err) {
        showAlert('error', 'Cannot confirm user, please try again');
        console.log('try catch err', err);
      }
    },
    updatePassword: async (e) => {
      e.preventDefault();

      if (DOM.password.value !== DOM.confirmPassword.value) {
        DOM.password.value = '';
        DOM.confirmPassword.value = '';
        return showAlert('error', 'Passwords do not match');
      }

      try {
        const res = await axios({
          method: 'PATCH',
          url: '/api/v1/auth/updatePassword',
          data: {
            password: DOM.password.value,
            confirmPassword: DOM.confirmPassword.value,
          },
        });

        if (res.data.status === 'success') {
          showAlert('success', 'Password Updated Successfully');
          window.setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          DOM.password.value = '';
          DOM.confirmPassword.value = '';
          console.log('Password Update Failed');
          showAlert('error', '');
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
        console.log('try catch err', err);
      }
    },
    deleteUser: async (e) => {
      try {
        const res = await axios({
          method: 'DELETE',
          url: '/api/v1/users/',
        });

        if (res.data.status === 'success') {
          showAlert('success', 'Account Deleted.  We are sorry to see you go.');
          window.setTimeout(() => {
            location.assign('/login');
          }, 1500);
        } else {
          showAlert('error', 'There was an error.  Could not delete Account');
        }
      } catch (err) {
        showAlert('error', err.response.data.message);
        console.log('try catch err', err);
      }
    },
  };
})();

export { updateUserUI };
