// /* eslint-disable */
import axios from 'axios';
import { connectFourUI as UI } from './connectFourUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    const [columns, rows] = UI.getColumnsAndRows();
    const imgRow = document.querySelectorAll(DOMStrings.containerImage);

    // SETUP DOM
    var DOM = {
      resetButton: document.querySelector(DOMStrings.resetButton),
      statusSpan: document.querySelector(DOMStrings.statusSpan),
      undoButton: document.querySelector(DOMStrings.undoButton),
      fullScreenButton: document.querySelector(DOMStrings.fullScreenButton),

      newGameButton: document.querySelector(DOMStrings.newGameButton),
    };

    // EVENT LISTENERS
    for (const row of rows) {
      for (const cell of row) {
        cell.addEventListener('mouseover', UI.handleCellMouseOver);
        cell.addEventListener('mouseout', UI.handleCellMouseOut);
        cell.addEventListener('click', UI.handleCellClick);
      }
    }
    DOM.newGameButton.addEventListener('click', UI.newGame);
    DOM.resetButton.addEventListener('click', UI.resetGame);
    DOM.undoButton.addEventListener('click', UI.undoLastMove);
    DOM.fullScreenButton.addEventListener('click', UI.toggleFullScreen);

    if (document.addEventListener) {
      document.addEventListener(
        'fullscreenchange',
        UI.onFullScreenChange,
        false
      );
      document.addEventListener(
        'mozfullscreenchange',
        UI.onFullScreenChange,
        false
      );
      document.addEventListener(
        'MSFullscreenChange',
        UI.onFullScreenChange,
        false
      );
      document.addEventListener(
        'webkitfullscreenchange',
        UI.onFullScreenChange,
        false
      );
    }
  };

  return {
    init: function () {
      console.log('Loaded Login Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
