// /* eslint-disable */
import { lessonUI as UI } from './lessonUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      addQuestionBtn: document.querySelector(DOMStrings.addQuestionBtn),
      lessonForm: document.querySelector(DOMStrings.lessonForm),
    };

    // EVENT LISTENERS
    // DOM.addQuestionBtn.addEventListener('click', UI.addQuestion);
    DOM.lessonForm.addEventListener('submit', UI.addQuestion);
  };

  return {
    init: function () {
      console.log('Loaded Add Classroom Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
