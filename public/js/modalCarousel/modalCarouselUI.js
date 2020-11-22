// credit to https://www.youtube.com/watch?v=6AuH3xSo6f8
/* eslint-disable */
import axios from 'axios';
import slugify from 'slugify';
import { showAlert } from '../alert';

const modalCarouselUI = (function () {
  const DOMStrings = {
    // BY CLASS
    containerImage: '.container--image',
    reviewButton: '.review-btn',
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

    openModalCarousel: (index = 0) => {
      alert('open review');
      // get index id off image container
      activeSlideIndex = parseInt(index);

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
      active = null;
      activeSlideIndex = null;
      newActive = null;
      DOM.carouselSlides.forEach((slide) => {
        slide.className = 'carousel-slide';
      });
    },
    changeSlide: (forward) => {
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
      if (e.target === active && !clickable) {
        newActive.classList.remove('newActive');
        clickable = true;
        active.className = 'carousel-slide';

        active = newActive;
        active.classList.add('active');
      }
    },
  };
})();

export { modalCarouselUI };
