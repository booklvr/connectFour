/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const lessonUI = (function () {
  const DOMStrings = {
    // BY CLASS
    // BY ID
    addQuestionBtn: '#submit-add-question-btn',
    lessonForm: '#lesson-form',
  };

  const DOM = {};

  // HELPER FUNCTIONS

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => {
      return DOMStrings;
    },
    addQuestion: (e) => {
      e.preventDefault();
      console.log('fuck yeah');
      e.target.submit();
    },
  };
})();

export { lessonUI };
