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
      fileInput: document.querySelector(DOMStrings.fileInput),
      playBtn: document.querySelector(DOMStrings.playBtn),
      deleteQuestionBtns: document.querySelectorAll(
        DOMStrings.deleteQuestionBtns
      ),
      editQuestionBtns: document.querySelectorAll(DOMStrings.editQuestionBtns),
      submitEditQuestionsBtns: document.querySelectorAll(
        DOMStrings.submitEditQuestionBtns
      ),
      // fileSelect: document.querySelector(DOMStrings.fileSelect),
    };

    // EVENT LISTENERS
    // DOM.addQuestionBtn.addEventListener('click', UI.addQuestion);
    DOM.lessonForm.addEventListener('submit', UI.addQuestion);
    DOM.fileDrag.addEventListener('dragover', UI.fileDragHover, false);
    DOM.fileDrag.addEventListener('dragleave', UI.fileDragHover, false);
    DOM.fileDrag.addEventListener('drop', UI.fileSelectHandler, false);
    DOM.fileInput.addEventListener('change', UI.fileSelectHandler);
    DOM.playBtn.addEventListener('click', UI.playConnectFour);

    DOM.deleteQuestionBtns.forEach((btn) => {
      btn.addEventListener('click', UI.deleteQuestion);
    });

    DOM.editQuestionBtns.forEach((btn) => {
      btn.addEventListener('click', UI.toggleEditForm);
    });

    DOM.submitEditQuestionsBtns.forEach((btn) => {
      btn.addEventListener('click', UI.editQuestion);
    });
  };

  return {
    init: function () {
      console.log('Loaded Add Classroom Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
