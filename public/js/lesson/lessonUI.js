/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

// get lesson from lesson.pug script
console.log(lesson);

const lessonUI = (function () {
  const DOMStrings = {
    // BY CLASS
    response: '.response',
    start: '.start',
    // BY ID
    // lessonForm: '#lesson-for',
    addQuestionBtn: '#submit-add-question-btn',
    lessonForm: '#lesson-form',
    fileInput: '#file-input',
    fileDrag: '#file-drag',
    messages: '#messages',

    notImage: '#not-image',
    fileImage: '#file-image',
    playBtn: '#play-button',
  };

  const DOM = {
    fileDrag: document.querySelector(DOMStrings.fileDrag),
    messages: document.querySelector(DOMStrings.messages),
    start: document.querySelector(DOMStrings.start),
    response: document.querySelector(DOMStrings.response),
    notImage: document.querySelector(DOMStrings.notImage),
    fileImage: document.querySelector(DOMStrings.fileImage),
    fileInput: document.querySelector(DOMStrings.fileInput),
    lessonForm: document.querySelector(DOMStrings.lessonForm),
    playBtn: document.querySelector(DOMStrings.playBtn),
  };

  // HELPER FUNCTIONS
  // upload image

  const fileDragHover = (e) => {
    e.stopPropagation();
    e.preventDefault();

    DOM.fileDrag.className = e.type === 'dragover' ? 'hover' : '';
  };

  const output = (msg) => {
    // DOM.messages.parentElement.classList.remove('hidden');
    DOM.messages.innerHTML = msg;
  };

  const parseFile = (file) => {
    output('<strong>' + encodeURI(file.name) + '</strong>');

    const imageName = file.name;
    const isImage = /\.(?=jpg|png|jpeg)/gi.test(imageName);

    if (isImage) {
      DOM.start.classList.add('hidden');
      DOM.response.classList.remove('hidden');
      DOM.notImage.classList.add('hidden');
      // Thumbnail Preview
      DOM.fileImage.classList.remove('hidden');
      DOM.fileImage.src = URL.createObjectURL(file);
    } else {
      DOM.fileImage.classList.add('hidden');
      DOM.notImage.classList.remove('hidden');
      DOM.start.classList.remove('hidden');
      DOM.response.classList.add('hidden');
      DOM.fileInput.value = '';
    }
  };

  // const uploadFile = (file) => {};

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => {
      return DOMStrings;
    },
    playConnectFour: (e) => {
      // lesson is coming in as global variable from pug template
      if (lesson.questions.length >= 7) {
        location.assign(`/connectFour/${lesson._id}`);
      } else {
        DOM.playBtn.textContent = 'Add More Questions...';
        window.setTimeout((e) => {
          DOM.playBtn.textContent = 'Play Connect Four';
        }, 3000);
      }
    },
    addQuestion: (e) => {
      e.preventDefault();

      console.log(e.target.elements);
      // console.log('fuck yeah');
      e.target.submit();
    },
    fileDragHover: (e) => {
      fileDragHover(e);
      // e.stopPropagation();
      // e.preventDefault();

      // DOM.fileDrag.className = e.type === 'dragover' ? 'hover' : '';
    },
    // test: () => {
    //   console.log('this is a fucking test');
    // },
    fileSelectHandler: (e) => {
      const files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (Array.from(files).length !== 1) {
        console.log('something horrible happened in fileSelectHandler');
        return;
      }

      // cancel event and hover styling
      fileDragHover(e);
      parseFile(files[0]);

      DOM.fileInput.files = e.target.files || e.dataTransfer.files;
      console.log(DOM.fileInput.files);
      // uploadFile(files[0]);
    },
  };
})();

export { lessonUI };

/* credit to https://codepen.io/gaitho/pen/mjBBLP?editors=1010 */
