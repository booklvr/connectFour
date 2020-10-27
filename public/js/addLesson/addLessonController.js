// /* eslint-disable */
import { addLessonUI as UI } from './addLessonUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      submitAddLessonBtn: document.querySelector(
        DOMStrings.submitAddLessonBtn
      ),
    };

    // EVENT LISTENERS
    DOM.submitAddLessonBtn.addEventListener('click', UI.addLesson);
  };

  return {
    init: function () {
      console.log('Loaded Add Classroom Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
