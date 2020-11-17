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
      carouselSlides: document.querySelectorAll(DOMStrings.carouselSlides),
      carouselArrowLeft: document.querySelector(DOMStrings.carouselArrowLeft),
      carouselArrowRight: document.querySelector(DOMStrings.carouselArrowRight),
    };

    // EVENT LISTENERS

    for (const img of imgRow) {
      img.addEventListener('click', UI.openModalCarousel);
    }

    DOM.carouselSlides.forEach((slide) => {
      slide.addEventListener('transitionend', UI.activeSlideTransitionEnd);
    });

    DOM.carouselArrowLeft.addEventListener('click', () => {
      UI.changeSlide(false);
    });
    DOM.carouselArrowRight.addEventListener('click', () => {
      UI.changeSlide(true);
    });

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