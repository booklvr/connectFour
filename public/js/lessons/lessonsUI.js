/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';
import moment from 'moment';

//inherit global variable lessons front pug

const lessonsUI = (function () {
  const DOMStrings = {
    // BY CLASS
    lessonDataContainer: '.container__lessons--data',

    // BY ID
    sortTitle: '#sort-title',
    sortClass: '#sort-class',
    sortChapter: '#sort-chapter',
    sortTarget: '#sort-target',
    sortCreatedAt: '#sort-createdAt',
    sortUpdatedAt: '#sort-updatedAt',
    sortArrows: '.btn--sort-arrow',
  };

  const DOM = {
    lessonDataContainer: document.querySelector(DOMStrings.lessonDataContainer),
    sortArrows: document.querySelectorAll(DOMStrings.sortArrows),
  };

  // HELPER FUNCTIONS

  const addRow = (row, data) => {
    let newColumn = document.createElement('div');
    newColumn.className += 'column';

    newColumn.innerHTML = data ? data : '';
    row.appendChild(newColumn);
  };

  const addRowDate = (row, data) => {
    let newColumn = document.createElement('div');
    newColumn.className += 'column';
    newColumn.innerHTML = moment(data).format('l h:mm a');
    row.appendChild(newColumn);
  };

  const createDOM = () => {
    DOM.lessonDataContainer.innerHTML = '';
    lessons.forEach((lesson) => {
      const newRow = document.createElement('div');
      newRow.className += 'container__row lesson-link';
      newRow.setAttribute('id', lesson._id);
      addRow(newRow, lesson.title);
      addRow(newRow, lesson.class);
      addRow(newRow, lesson.chapter);
      addRow(newRow, lesson.target);
      addRowDate(newRow, lesson.createdAt);
      addRowDate(newRow, lesson.updatedAt);
      const deleteBtn = document.createElement('div');
      deleteBtn.className += 'btn btn--red btn__rnd--sm delete-lesson-btn';
      deleteBtn.setAttribute('id', `delete-lesson-${lesson._id}`);
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      newRow.appendChild(deleteBtn);
      DOM.lessonDataContainer.appendChild(newRow);
    });
  };

  // sort functions

  const addSortClass = (target) => {
    target.classList.toggle('asc');
    target.classList.toggle('desc');
  };

  const addSortArrow = (target) => {
    DOM.sortArrows.forEach((btn) => {
      btn.classList.add('hidden');
    });

    const sortArrow = target.nextElementSibling;
    sortArrow.classList.remove('hidden');

    if (target.classList.contains('asc')) {
      sortArrow.firstChild.setAttribute('class', 'fas fa-caret-up');
    } else {
      sortArrow.firstChild.setAttribute('class', 'fas fa-caret-down');
    }
  };
  const dynamicSort = (sortOrder, property) => (a, b) =>
    sortOrder *
    (a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0);

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => {
      return DOMStrings;
    },
    loadPage: () => {
      createDOM();
    },
    sort: (e) => {
      const sortType = e.target.id.split('-').pop();
      const sortOrder = e.target.classList.contains('asc') ? 1 : -1;

      lessons.sort(dynamicSort(sortOrder, sortType));

      addSortClass(e.target);
      addSortArrow(e.target);
      createDOM();
    },
    goToLesson: (e) => {
      console.log(e.target.parentElement);
      location.assign(`lessons/${e.target.parentElement.id}`);
    },
  };
})();

export { lessonsUI };
