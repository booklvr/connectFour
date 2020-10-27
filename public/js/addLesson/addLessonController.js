// /* eslint-disable */
import { addClassroomUI as UI } from './addLessonUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      submitAddClassroomBtn: document.querySelector(
        DOMStrings.submitAddClassroomBtn
      ),
    };

    // EVENT LISTENERS
    DOM.submitAddClassroomBtn.addEventListener('click', UI.addClassroom);
  };

  return {
    init: function () {
      console.log('Loaded Add Classroom Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
