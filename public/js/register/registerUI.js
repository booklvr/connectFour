/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';
import validator from 'validator';

const registerUI = (function () {
  const DOMStrings = {
    // BY ID
    displayName: '#display-name',
    email: '#email',
    password: '#password',
    passwordConfirm: '#password-confirm',
    submitRegisterBtn: '#submit-register-btn',

    // BY TYPE
    inputs: 'input',
  };

  const DOM = {
    displayName: document.querySelector(DOMStrings.displayName),
    email: document.querySelector(DOMStrings.email),
    password: document.querySelector(DOMStrings.password),
    passwordConfirm: document.querySelector(DOMStrings.passwordConfirm),
    submitRegisterBtn: document.querySelector(DOMStrings.submitRegisterBtn),
    inputs: document.querySelectorAll(DOMStrings.inputs),
  };

  const addErrorMessage = (target, msg) => {
    addInvalidClass(target);
    const errorMsg = target.nextSibling;
    errorMsg.innerText = msg;
    errorMsg.classList.remove('hidden');
  };

  const addInvalidClass = (target) => {
    target.classList.add('invalid');
    target.classList.remove('valid');
  };

  const addValidClass = (target) => {
    target.classList.remove('invalid');
    target.classList.add('valid');
    target.nextSibling.classList.add('hidden');
  };

  // HELPER FUNCTIONS
  const validateDisplayName = (target) => {
    if (validator.isEmpty(target.value)) {
      return { valid: false, msg: 'you must provide a display name' };
    } else if (!validator.isLength(target.value, { min: 4, max: 16 })) {
      return {
        valid: false,
        msg: 'display name must be between 4 and 16 characters',
      };
    } else {
      return { valid: true };
    }
  };

  const validateEmail = (target) => {
    if (!validator.isEmail(target.value)) {
      return { valid: false, msg: 'must provide a valid email address' };
    } else {
      return { valid: true };
    }
  };

  const validatePassword = (target) => {
    if (!validator.isLength(target.value, { min: 8, max: undefined })) {
      return { valid: false, msg: 'password must be at least 8 characters' };
    } else {
      return { valid: true };
    }
  };

  const validateConfirmPassword = (target) => {
    const password = target.parentElement.parentElement.querySelector('input')
      .value;
    if (!validator.equals(target.value, password)) {
      return { valid: false, msg: 'passwords do not match' };
    } else {
      return { valid: true, msg: 'you must provide a display name' };
    }
  };

  const checkValidFields = () => {
    return Array.from(DOM.inputs).every(({ classList }) => {
      return classList.contains('valid');
    });
  };

  const validate = (target) => {
    switch (target.id) {
      case 'display-name':
        return validateDisplayName(target);
        break;
      case 'email':
        return validateEmail(target);
        break;
      case 'password':
        return validatePassword(target);
        break;
      case 'password-confirm':
        return validateConfirmPassword(target);
        break;
      default:
        console.log('something went wrong.');
        showAlert('error', 'something went wrong');
    }
  };

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    validateOnKeyUp: (e) => {
      const target = e.target;
      let valid, msg;
      ({ valid, msg } = validate(target));
      if (valid) {
        addValidClass(target);
      }
    },
    validateOnBlur: (e) => {
      const target = e.target;
      let valid, msg;
      ({ valid, msg } = validate(target));
      if (valid) {
        addValidClass(target);
      } else {
        addErrorMessage(target, msg);
      }
    },

    register: async function (e) {
      e.preventDefault();

      if (checkValidFields()) {
        DOM.submitRegisterBtn.innerHTML =
          '<p class="loading">Registering<span>.</span><span>.</span><span>.</span></p>';
        DOM.submitRegisterBtn.disabled = true;

        try {
          const res = await axios({
            method: 'POST',
            url: '/api/v1/users/',
            data: {
              displayName: DOM.displayName.value,
              email: DOM.email.value,
              password: DOM.password.value,
              passwordConfirm: DOM.passwordConfirm.value,
            },
          });

          if (res.data.status === 'success') {
            window.setTimeout(() => {
              location.assign('/lessons');
            }, 1000);
          } else {
            showAlert('error', 'register failed');
            DOM.submitRegisterBtn.innerHTML = 'Sign Up';
            DOM.submitRegisterBtn.disabled = false;
          }
        } catch (err) {
          showAlert('error', err.response.data.message);
          console.log('try catch err', err);
          DOM.submitRegisterBtn.innerHTML = 'Sign Up';
          DOM.submitRegisterBtn.disabled = false;
        }
      } else {
        showAlert('error', 'Check all form fields are valid');
      }
    },
  };
})();

export { registerUI };
