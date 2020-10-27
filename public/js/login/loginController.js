// /* eslint-disable */
import axios from 'axios';
import { loginUI as UI } from './loginUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      email: document.querySelector(DOMStrings.email),
      password: document.querySelector(DOMStrings.email),
      submitLoginBtn: document.querySelector(DOMStrings.submitLoginBtn),
    };

    // EVENT LISTENERS
    DOM.submitLoginBtn.addEventListener('click', UI.login);
  };

  return {
    init: function () {
      console.log('Loaded Login Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
