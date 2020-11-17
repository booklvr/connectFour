// credit to https://www.youtube.com/watch?v=6AuH3xSo6f8
/* eslint-disable */
import axios from 'axios';
import slugify from 'slugify';
import { showAlert } from '../alert';

const modalCarouselUI = (function () {
  const DOMStrings = {
    // BY CLASS
    containerImage: '.container--image',
    modalsContainer: '.container--modals',
    modalCarouselContainer: '.modal--carousel-container',
    carouselSlides: '.carousel-slide',
    carouselArrowLeft: '.carousel-arrow-left',
    carouselArrowRight: '.carousel-arrow-right',
    exitModalBtn: '.exit-modal-btn',

    // BY ID

    //BY TYPE
    body: 'body',
  };

  // DOM
  const DOM = {
    modalCarouselContainer: document.querySelector(
      DOMStrings.modalCarouselContainer
    ),
    modalsContainer: document.querySelector(DOMStrings.modalsContainer),
    carouselSlides: [...document.querySelectorAll(DOMStrings.carouselSlides)],

    body: document.querySelector(DOMStrings.body),
  };

  //VARIABLES
  const SLIDE_TIME = 500;
  let clickable = true;
  let active = null;
  let activeSlideIndex = null;
  let newActive = null;

  // HELPER FUNCTIONS

  const initSlider = () => {
    carouselSlides.forEach((slide) => {
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDE_TIME}ms ease;
                      animation-duration: ${SLIDE_TIME}ms
        `
      );
    });
  };

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => DOMStrings,

    openModalCarousel: (e) => {
      // get index id off image container
      activeSlideIndex = e.target.parentElement.parentElement.id
        .split('-')
        .pop();

      // disable scroll on body
      DOM.body.classList.add('modal-visible');
      DOM.modalsContainer.classList.remove('hidden');

      // reveal targeted image
      active = DOM.carouselSlides[activeSlideIndex];
      active.classList.remove('hidden');
    },
    closeModalCarousel: (e) => {
      // console.log(e.target);
      const exitBtn = e.target.parentElement;
      DOM.modalsContainer.classList.add('hidden');
      DOM.modalSlides;
      // const modalIndex = exitBtn.id.split('-').pop();
      // console.log(modalIndex);
      // modals[modalIndex].classList.add('hidden');
    },
    changeSlide: (forward) => {
      console.log(forward);
      console.log('clicked that shit');
      if (clickable) {
        if (forward) {
          console.log('active slide index', activeSlideIndex);

          console.log(DOM.carouselSlides);
          newActive = DOM.carouselSlides[(activeSlideIndex + 1) % 7];
          active.classList.add('slideOutLeft');
          newActive.classList.add('slideInRight', 'active');
        } else {
        }
      }
    },
    activeSlideTransitionEnd: (e) => {
      console.log('e.target', e.target);
      console.log('active', active);
      if (e.target === active && !clickable) {
        clickable = true;
        active.className = '.carousel-slide.hidden';
      }
    },
  };
})();

export { modalCarouselUI };
