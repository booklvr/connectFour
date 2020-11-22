/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

// get lesson from lesson.pug script

const lessonUI = (function () {
  const DOMStrings = {
    // BY CLASS
    response: '.response',
    start: '.start',
    deleteQuestionBtns: '.delete-question-btn',
    editQuestionBtns: '.edit-question-btn',
    submitEditQuestionBtns: '.submit-edit-question-btn',
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

  const uploadFile = (file) => {};

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

      e.target.submit();
    },
    fileDragHover: (e) => {
      fileDragHover(e);
    },
    fileSelectHandler: (e) => {
      const files = e.target.files || e.dataTransfer.files;
      if (Array.from(files).length !== 1) {
        console.log('something horrible happened in fileSelectHandler');
        return;
      }

      // cancel event and hover styling
      fileDragHover(e);
      parseFile(files[0]);

      DOM.fileInput.files = e.target.files || e.dataTransfer.files;
    },
    deleteQuestion: async (e) => {
      const questionId = e.target.parentElement.id.split('-').pop();
      try {
        const res = await axios({
          method: 'DELETE',
          url: `/api/v1/lessons/${lesson._id}/${questionId}`,
        });

        if (res.data.status === 'success') {
          showAlert('success', 'question deleted successfully.');
          window.setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          DOM.student.value = '';
          console.log('Error Deleting Question.');
          showAlert('error', 'Error Deleting Question');
        }
      } catch (err) {
        showAlert('error', err);
        console.log('try catch err', err);
      }
    },
    toggleEditForm: (e) => {
      const question = e.target.parentElement.parentElement.parentElement;
      question.parentElement.classList.add('active');
      const editForm = question.parentElement.querySelector(
        '.container-edit-question-form'
      );
      question.classList.add('hidden');
      editForm.classList.remove('hidden');

      
    },
    editQuestion: async (e) => {
      e.preventDefault();
      const questionId = e.target.id.split('-').pop();
      const form = e.target.parentElement;
      const question = form.querySelector('.edit-text').value;

      try {
        const res = await axios({
          method: 'PATCH',
          url: `/api/v1/lessons/${lesson._id}/${questionId}`,
          data: {
            question,
          },
        });

        if (res.data.status === 'success') {
          showAlert('success', 'question edited successfully.');
          window.setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          DOM.student.value = '';
          console.log('Error Editing Question.');
          showAlert('error', 'Error Editing Question');
        }
      } catch (err) {
        showAlert('error', err);
        console.log('try catch err', err);
      }
    },
  };
})();

export { lessonUI };

/* credit to https://codepen.io/gaitho/pen/mjBBLP?editors=1010 */
