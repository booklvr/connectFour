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

      rowHeader: document.querySelector(DOMStrings.rowHeader),

      sortPlays: document.querySelector(DOMStrings.sortPlays),
      sortTitle: document.querySelector(DOMStrings.sortTitle),
      sortTarget: document.querySelector(DOMStrings.sortTarget),
      sortCreatedAt: document.querySelector(DOMStrings.sortCreatedAt),

      searchTargetInput: document.querySelector(DOMStrings.searchTargetInput),
      searchTitleInput: document.querySelector(DOMStrings.searchTitleInput),
      getMoreLessonsBtn: document.querySelector(DOMStrings.getMoreLessonsBtn),

      // sortUpdatedAt: document.querySelector(DOMStrings.sortUpdatedAt),
      // sortClass: document.querySelector(DOMStrings.sortClass),
      // sortChapter: document.querySelector(DOMStrings.sortChapter),
    };

    // HELPER FUNCTIONS
    // delay script for input
    function delay(fn, ms) {
      let timer = 0;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(fn.bind(this, ...args), ms || 0);
      };
    }

    // EVENT LISTENERS

    DOM.sortPlays.addEventListener('click', UI.sort);
    DOM.sortTitle.addEventListener('click', UI.sort);
    DOM.sortTarget.addEventListener('click', UI.sort);
    DOM.sortCreatedAt.addEventListener('click', UI.sort);
    DOM.lessonDataContainer.addEventListener('click', UI.goToLesson);

    DOM.searchTargetInput.addEventListener('keyup', delay(UI.search, 500));
    DOM.searchTitleInput.addEventListener('keyup', delay(UI.search, 500));
    DOM.getMoreLessonsBtn.addEventListener('click', UI.getMoreLessons);
    // DOM.sortClass.addEventListener('click', UI.sort);
    // DOM.sortChapter.addEventListener('click', UI.sort);
    // DOM.sortUpdatedAt.addEventListener('click', UI.sort);
  };

  return {
    init: function () {
      console.log('Loaded searchLessons Frontend');
      setupEventListeners();
      UI.loadPage();
    },
  };
})(UI);

controller.init();
