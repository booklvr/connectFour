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
      fileDrag: document.querySelector(DOMStrings.fileDrag),
      fileSelect: document.querySelector(DOMStrings.fileSelect),
      // fileSelect: document.querySelector(DOMStrings.fileSelect),
    };

    // EVENT LISTENERS
    // DOM.addQuestionBtn.addEventListener('click', UI.addQuestion);
    DOM.lessonForm.addEventListener('submit', UI.addQuestion);
    DOM.fileDrag.addEventListener('dragover', UI.fileDragHover, false);
    DOM.fileDrag.addEventListener('dragleave', UI.fileDragHover, false);
    DOM.fileDrag.addEventListener('drop', UI.fileSelectHandler, false);
    DOM.fileSelect.addEventListener('change', UI.fileSelectHandler);
    // DOM.fileSelect.addEventListener('change', fileSelectHandler, false);
  };

  return {
    init: function () {
      console.log('Loaded Add Classroom Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
