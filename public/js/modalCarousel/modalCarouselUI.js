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
    carouselIndexBtns: '.carousel-index-btn',

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
    carouselIndexBtns: [
      ...document.querySelectorAll(DOMStrings.carouselIndexBtns),
    ],

    body: document.querySelector(DOMStrings.body),
  };

  console.log(DOM.carouselIndexBtns);

  //VARIABLES
  const SLIDE_TIME = 500;
  let clickable = true;
  let active = null;
  let activeSlideIndex = null;
  let newActive = null;

  // HELPER FUNCTIONS

  // const initSlider = () => {
  //   DOM.carouselSlides.forEach((slide) => {
  //     slide.setAttribute(
  //       'style',
  //       `transition: transform ${SLIDE_TIME}ms ease;
  //                     animation-duration: ${SLIDE_TIME}ms
  //       `
  //     );
  //   });
  // };

  // initSlider();

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => DOMStrings,

    openModalCarousel: (e) => {
      // get index id off image container
      activeSlideIndex = e.target.parentElement.parentElement.id
        .split('-')
        .pop();
      // console.log('activeSlideIndex:', activeSlideIndex);

      // disable scroll on body
      DOM.body.classList.add('modal-visible');
      DOM.modalsContainer.classList.remove('hidden');

      // reveal targeted image
      active = DOM.carouselSlides[activeSlideIndex];
      active.classList.add('active');
      DOM.carouselIndexBtns.forEach((btn) =>
        btn.classList.remove('active-index')
      );
      DOM.carouselIndexBtns[activeSlideIndex].classList.add('active-index');
    },
    closeModalCarousel: (e) => {
      // console.log(e.target);
      DOM.modalsContainer.classList.add('hidden');
      DOM.body.classList.remove('modal-visible');
    },
    changeSlide: (forward) => {
      console.log('CHANGE_SLIDE_FUNCTION');

      if (forward) {
        if (clickable) {
          // make button unclickable
          clickable = false;
          // point active to next slide
          activeSlideIndex = (activeSlideIndex + 1) % 7;
          newActive = DOM.carouselSlides[activeSlideIndex];

          //animate active slide
          active.classList.add('slide-out-left');
          newActive.classList.add('newActive');
          DOM.carouselIndexBtns.forEach((btn) =>
            btn.classList.remove('active-index')
          );
          DOM.carouselIndexBtns[activeSlideIndex].classList.add('active-index');
          newActive.classList.add('slide-in-right', 'active');
          // active.classList.add('hidden');

          //change newActive
          // newActive.classList.remove('hidden');
        }
      } else {
        if (clickable) {
          clickable = false;
          activeSlideIndex = (activeSlideIndex - 1 + 7) % 7;
          newActive = DOM.carouselSlides[activeSlideIndex];
          active.classList.add('slide-out-right');
          newActive.classList.add('newActive');
          DOM.carouselIndexBtns.forEach((btn) =>
            btn.classList.remove('active-index')
          );
          DOM.carouselIndexBtns[activeSlideIndex].classList.add('active-index');
          newActive.classList.add('slide-in-left', 'active');
        }
      }
    },
    handleIndexBtnClick: (e) => {
      activeSlideIndex = e.target.parentElement.id.split('-').pop();
      DOM.carouselIndexBtns.forEach((btn) =>
        btn.classList.remove('active-index')
      );
      DOM.carouselIndexBtns[activeSlideIndex].classList.add('active-index');

      active.className = 'carousel-slide';
      active = DOM.carouselSlides[activeSlideIndex];
      active.classList.add('active');
    },
    activeSlideTransitionEnd: (e) => {
      console.log('ACTIVE_SLIDE_TRANSITION_END_FUNCTION');

      if (e.target === active && !clickable) {
        newActive.classList.remove('newActive');
        console.log('yup they equaled each other :)');
        clickable = true;
        active.className = 'carousel-slide';
        console.log('active', active);
        console.log('newActive', newActive);
        active = newActive;
        active.classList.add('active');
      }
    },
  };
})();

export { modalCarouselUI };
