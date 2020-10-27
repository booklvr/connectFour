/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const addLessonUI = (function () {
  const DOMStrings = {
    // BY CLASS
    // BY ID
    title: '#title',
    class: '#class',
    languageFocus: '#languageFocus',
    chapter: '#chapter',
    submitAddLessonBtn: '#submit-add-lesson-btn',
  };

  const DOM = {
    title: document.querySelector(DOMStrings.title),
    class: document.querySelector(DOMStrings.class),
    chapter: document.querySelector(DOMStrings.chapter),
    languageFocus: document.querySelector(DOMStrings.languageFocus),
    submitAddLessonBtn: document.querySelector(
      DOMStrings.submitAddLessonBtn
    ),
  };

  // HELPER FUNCTIONS

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    addLesson: async (e) => {
      e.preventDefault();

      DOM.submitAddLessonBtn.innerHTML =
        '<p class="loading">Adding Lesson<span>.</span><span>.</span><span>.</span></p>';
      DOM.submitAddLessonBtn.disabled = true;

      try {
        const res = await axios({
          method: 'POST',
          url: '/api/v1/lesson',
          data: {
            title: DOM.title.value,
            class: DOM.class.value,
            chapter: DOM.chapter.value,
            languageFocus: DOM.chapter.focus,
          },
        });

        if (res.data.status === 'success') {
          showAlert('success', 'Lesson Added Successfully');
          window.setTimeout(() => {
            location.assign(`/my-lessons/${res.data.data.data.slug}`);
          }, 1000);
        } else {
          DOM.className.value = '';
          showAlert('error', 'There was an error.  Could not add class.');
        }
      } catch (err) {
        showAlert(
          'error',
          'A classroom with that name already exists.  Please choose a different name'
        );
        console.log('try catch err', err);
        window.setTimeout(() => {
          location.reload();
        }, 3000);
      }
    },
  };
})();

export { addLessonUI };
