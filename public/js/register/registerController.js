// /* eslint-disable */
import { registerUI as UI } from './registerUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      submitRegisterBtn: document.querySelector(DOMStrings.submitRegisterBtn),
      inputs: document.querySelectorAll(DOMStrings.inputs),
    };

    // EVENT LISTENERS
    DOM.submitRegisterBtn.addEventListener('click', UI.register);
    DOM.inputs.forEach((input) =>
      input.addEventListener('keyup', UI.validateOnKeyUp)
    );

    DOM.inputs.forEach((input) =>
      input.addEventListener('blur', UI.validateOnBlur)
    );
  };

  return {
    init: function () {
      console.log('You can now register');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
