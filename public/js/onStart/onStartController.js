// /* eslint-disable */
// import axios from 'axios';
import { onStartUI as UI } from './onStartUI';

var controller = (function (UI) {
  const setupEventListeners = function () {

    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    // SETUP DOM
    var DOM = {
      logout: document.querySelector(DOMStrings.logout),
    };

    // EVENT LISTENERS
    if (DOM.logout) DOM.logout.addEventListener('click', UI.logout);
  };

  return {
    init: function () {
      console.log('Loaded On Start Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
