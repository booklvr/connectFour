// /* eslint-disable */
import { resetPasswordUI as UI } from './resetPasswordUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      resetPasswordBtn: document.querySelector(DOMStrings.resetPasswordBtn),
    };

    // EVENT LISTENERS
    DOM.resetPasswordBtn.addEventListener('click', UI.resetPassword);
  };

  return {
    init: function () {
      console.log('Loaded Reset Password Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
