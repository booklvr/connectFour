// /* eslint-disable */
import axios from 'axios';
import { forgotPasswordUI as UI } from './forgotPasswordUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      forgotPasswordBtn: document.querySelector(DOMStrings.forgotPasswordBtn),
    };

    // EVENT LISTENERS
    DOM.forgotPasswordBtn.addEventListener('click', UI.forgotPassword);
  };

  return {
    init: function () {
      console.log('Loaded Forgot Password Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
