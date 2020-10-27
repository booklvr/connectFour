// /* eslint-disable */
import axios from 'axios';
import { connectFourUI as UI } from './connectFourUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    const [columns, rows] = UI.getColumnsAndRows();

    // SETUP DOM
    var DOM = {
      resetButton: document.querySelector(DOMStrings.resetButton),
      statusSpan: document.querySelector(DOMStrings.statusSpan),
      undoButton: document.querySelector(DOMStrings.undoButton),
    };
    

    // EVENT LISTENERS
    for (const row of rows) {
      for (const cell of row) {
        cell.addEventListener('mouseover', UI.handleCellMouseOver);
        cell.addEventListener('mouseout', UI.handleCellMouseOut);
        cell.addEventListener('click', UI.handleCellClick);
      }
    }
    DOM.resetButton.addEventListener('click', UI.resetGame);
    DOM.undoButton.addEventListener('click', UI.undoLastMove);
  };

  return {
    init: function () {
      console.log('Loaded Login Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
