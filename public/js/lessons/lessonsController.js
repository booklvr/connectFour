// /* eslint-disable */
import { lessonsUI as UI } from './lessonsUI';

// console.log(lessons);

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      lessonDataContainer: document.querySelector(
        DOMStrings.lessonDataContainer
      ),
      sortTitle: document.querySelector(DOMStrings.sortTitle),
      sortClass: document.querySelector(DOMStrings.sortClass),
      sortChapter: document.querySelector(DOMStrings.sortChapter),
      sortTarget: document.querySelector(DOMStrings.sortTarget),
      sortCreatedAt: document.querySelector(DOMStrings.sortCreatedAt),
      sortUpdatedAt: document.querySelector(DOMStrings.sortUpdatedAt),
    };

    // EVENT LISTENERS
    DOM.sortTitle.addEventListener('click', UI.sort);
    DOM.sortClass.addEventListener('click', UI.sort);
    DOM.sortChapter.addEventListener('click', UI.sort);
    DOM.sortTarget.addEventListener('click', UI.sort);
    DOM.sortCreatedAt.addEventListener('click', UI.sort);
    DOM.sortUpdatedAt.addEventListener('click', UI.sort);
    DOM.lessonDataContainer.addEventListener('click', UI.goToLesson);
  };

  return {
    init: function () {
      console.log('Loaded Lessons Frontend');
      setupEventListeners();
      UI.loadPage();
    },
  };
})(UI);

controller.init();
