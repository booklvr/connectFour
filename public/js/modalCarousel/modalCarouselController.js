// /* eslint-disable */
import axios from 'axios';
import { modalCarouselUI as UI } from './modalCarouselUI';

var controller = (function (UI) {
  const setupEventListeners = function () {
    //GET DOMSTRINGS
    var DOMStrings = UI.getDOMStrings();

    const imgRow = document.querySelectorAll(DOMStrings.containerImage);

    // SETUP DOM
    var DOM = {
      reviewButton: document.querySelector(DOMStrings.reviewButton),
      exitModalBtn: document.querySelector(DOMStrings.exitModalBtn),
      carouselSlides: document.querySelectorAll(DOMStrings.carouselSlides),
      carouselArrowLeft: document.querySelector(DOMStrings.carouselArrowLeft),
      carouselArrowRight: document.querySelector(DOMStrings.carouselArrowRight),
      carouselIndexBtns: [
        ...document.querySelectorAll(DOMStrings.carouselIndexBtns),
      ],
    };

    // EVENT LISTENERS

    DOM.reviewButton.addEventListener('click', () => {
      UI.openModalCarousel();
    });

    for (const img of imgRow) {
      img.addEventListener('click', (e) => {
        const activeSlideIndex = e.target.parentElement.parentElement.id
          .split('-')
          .pop();
        UI.openModalCarousel(activeSlideIndex);
      });
    }

    DOM.carouselSlides.forEach((slide) => {
      slide.addEventListener('transitionend ', UI.activeSlideTransitionEnd);
    });

    DOM.carouselSlides.forEach((slide) => {
      slide.ontransitionend = (e) => {
        UI.activeSlideTransitionEnd(e);
      };
    });

    DOM.carouselIndexBtns.forEach((indexBtn) => {
      indexBtn.addEventListener('click', UI.handleIndexBtnClick);
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
