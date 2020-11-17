// /* eslint-disable */
import axios from 'axios';
import { modalCarouselUI as UI } from './modalCarouselUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    const imgRow = document.querySelectorAll(DOMStrings.containerImage);
    console.log(imgRow);

    // SETUP DOM
    var DOM = {
      exitModalBtn: document.querySelector(DOMStrings.exitModalBtn),
      carouselArrowLeft: document.querySelector(DOMStrings.carouselArrowLeft),
      carouselArrowRight: document.querySelector(DOMStrings.carouselArrowRight),
    };

    // EVENT LISTENERS

    for (const img of imgRow) {
      img.addEventListener('click', UI.openModalCarousel);
    }
    DOM.carouselArrowLeft.addEventListener('click', UI.changeSlide);
    DOM.carouselArrowRight.addEventListener('click', UI.changeSlide);

    DOM.exitModalBtn.addEventListener('click', UI.closeModalCarousel);
  };

  return {
    init: function () {
      console.log('Loaded Login Frontend');
      setupEventListeners();
    },
  };
})(UI);

controller.init();
