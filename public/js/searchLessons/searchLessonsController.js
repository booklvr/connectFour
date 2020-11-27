// /* eslint-disable */
import { searchLessonsUI as UI } from './searchLessonsUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      lessonDataContainer: document.querySelector(
        DOMStrings.lessonDataContainer
      ),

      resizeHandlers: document.querySelectorAll(DOMStrings.resizeHandlers),
      rowHeader: document.querySelector(DOMStrings.rowHeader),

      sortPlays: document.querySelector(DOMStrings.sortPlays),
      sortTitle: document.querySelector(DOMStrings.sortTitle),
      sortTarget: document.querySelector(DOMStrings.sortTarget),
      sortCreatedAt: document.querySelector(DOMStrings.sortCreatedAt),

      // sortUpdatedAt: document.querySelector(DOMStrings.sortUpdatedAt),
      // sortClass: document.querySelector(DOMStrings.sortClass),
      // sortChapter: document.querySelector(DOMStrings.sortChapter),
    };

    // EVENT LISTENERS
    DOM.resizeHandlers.forEach((handler) =>
      handler.addEventListener('mousedown', UI.mouseDown)
    );

    document.addEventListener('mouseover', UI.mouseMove);

    document.addEventListener('mouseup', UI.mouseUp);

    // DOM.sortPlays.addEventListener('click', UI.sortPlays);
    // DOM.sortTitle.addEventListener('click', UI.sort);
    // DOM.sortQuestions.addEventListener('click', UI.sortQuestions);
    // DOM.sortTarget.addEventListener('click', UI.sort);
    // DOM.sortCreatedAt.addEventListener('click', UI.sort);
    // DOM.lessonDataContainer.addEventListener('click', UI.goToLesson);
    // DOM.lessonDataContainer.addEventListener('click', UI.deleteLesson);

    // DOM.sortClass.addEventListener('click', UI.sort);
    // DOM.sortChapter.addEventListener('click', UI.sort);
    // DOM.sortUpdatedAt.addEventListener('click', UI.sort);
  };

  return {
    init: function () {
      console.log('Loaded Lessons Frontend');
      setupEventListeners();
      // UI.loadPage();
    },
  };
})(UI);

controller.init();
