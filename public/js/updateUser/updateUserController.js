// /* eslint-disable */
import axios from 'axios';
import { updateUserUI as UI } from './updateUserUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      submitUpdateUserBtn: document.querySelector(
        DOMStrings.submitUpdateUserBtn
      ),
      submitConfirmPasswordBtn: document.querySelector(
        DOMStrings.submitConfirmPasswordBtn
      ),
      submitUpdatePasswordBtn: document.querySelector(
        DOMStrings.submitUpdatePasswordBtn
      ),
      deleteUserBtn: document.querySelector(DOMStrings.deleteUserBtn),
    };

    // EVENT LISTENERS
    DOM.submitUpdateUserBtn.addEventListener('click', UI.updateUser);
    DOM.submitConfirmPasswordBtn.addEventListener('click', UI.confirmPassword);
    DOM.submitUpdatePasswordBtn.addEventListener('click', UI.updatePassword);
    DOM.deleteUserBtn.addEventListener('click', UI.deleteUser);
  };

  return {
    init: function () {
      console.log('Loaded Update User Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
