/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';
import moment from 'moment';

//inherit global variable lessons front pug

const searchLessonsUI = (function () {
  const DOMStrings = {
    // BY CLASS
    resizeHandlers: '.resize-handler',
    rowHeader: '.row__header',

    // BY ID
    sortPlays: '#sort-plays',
    sortTitle: '#sort-title',
    sortQuestions: 'sort-questions',
    sortTarget: '#sort-target',
    sortCreatedAt: '#sort-createdAt',

    sortArrows: '.btn--sort-arrow',

    // sortUpdatedAt: '#sort-updatedAt',
    // sortClass: '#sort-class',
    // sortChapter: '#sort-chapter',
  };

  const DOM = {
    lessonDataContainer: document.querySelector(DOMStrings.lessonDataContainer),
    sortArrows: document.querySelectorAll(DOMStrings.sortArrows),
  };

  // CONST VARIABLES
  const minWidth = 50;
  let isDrag = false;
  let startX = 0;
  let col = null;
  let colWidth = 0;
  let nextCol = null;
  let nextColWidth = 0;
  let rowWidth = 0;

  // HELPER FUNCTIONS

  // const addRow = (row, data) => {
  //   let newColumn = document.createElement('div');
  //   newColumn.className += 'column';

  //   newColumn.innerHTML = data ? data : '';
  //   row.appendChild(newColumn);
  // };

  // const addRowDate = (row, data) => {
  //   let newColumn = document.createElement('div');
  //   newColumn.className += 'column';
  //   newColumn.innerHTML = moment(data).format('l h:mm a');
  //   row.appendChild(newColumn);
  // };

  // const createDOM = () => {
  //   DOM.lessonDataContainer.innerHTML = '';
  //   lessons.forEach((lesson) => {
  //     const newRow = document.createElement('div');
  //     newRow.className += 'container__row lesson-link';
  //     newRow.setAttribute('id', lesson._id);
  //     addRow(newRow, lesson.title);
  //     addRow(newRow, lesson.class);
  //     addRow(newRow, lesson.chapter);
  //     addRow(newRow, lesson.target);
  //     addRowDate(newRow, lesson.createdAt);
  //     addRowDate(newRow, lesson.updatedAt);
  //     const deleteBtn = document.createElement('div');
  //     deleteBtn.className += 'btn btn--red btn__rnd--sm delete-lesson-btn';
  //     deleteBtn.setAttribute('id', `delete-lesson-${lesson._id}`);
  //     deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  //     newRow.appendChild(deleteBtn);
  //     DOM.lessonDataContainer.appendChild(newRow);
  //   });
  // };

  // sort functions

  // const addSortClass = (target) => {
  //   target.classList.toggle('asc');
  //   target.classList.toggle('desc');
  // };

  // const addSortArrow = (target) => {
  //   DOM.sortArrows.forEach((btn) => {
  //     btn.classList.add('hidden');
  //   });

  //   const sortArrow = target.nextElementSibling;
  //   sortArrow.classList.remove('hidden');

  //   if (target.classList.contains('asc')) {
  //     sortArrow.firstChild.setAttribute('class', 'fas fa-caret-up');
  //   } else {
  //     sortArrow.firstChild.setAttribute('class', 'fas fa-caret-down');
  //   }
  // };
  // const dynamicSort = (sortOrder, property) => (a, b) =>
  //   sortOrder *
  //   (a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0);

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => {
      return DOMStrings;
    },
    mouseDown: (e) => {
      console.log(e.target.parentElement);

      col = e.target.closest('.column__heading');
      colWidth = col.offsetWidth;
      nextCol = col.nextSibling;
      nextColWidth = nextCol.offsetWidth;
      // columnId = col.classList[col.classList.length - 1].split('-').pop();

      const row = e.target.parentElement.parentElement;
      const rowWidth = row.offsetWidth;

      console.log('col', col);
      console.log('colWidth', colWidth);
      console.log('nextCol', nextCol);
      console.log('nextColWidth', nextColWidth);
      console.log('row', row);
      console.log('rowWidth', rowWidth);


      isDrag = true;
      startX = e.pageX;

      col.style.userSelect = isDrag ? 'none' : 'auto';
    },
    mouseMove: (e) => {
      if (!isDrag) {
        return;
      }
      let x = e.pageX;
      let newNextColumnWidth = Math.max(minWidth, nextColWidth + startX - x);
      let newColumnWidth = Math.max(minWidth, colWidth + x - startX);

      if (newNextColumnWidth < minWidth) return (newNextColumnWidth = minWidth);
      if (newColumnWidth < minWidth) return (newColumnWidth = minWidth);

      col.style.width = `${newColumnWidth / 10}rem`;
      nextCol.style.width = `${newNextColumnWidth / 10}rem`;
    },
    mouseUp: (e) => {
      isDrag = false;
      // console.log(e.target);
    },

    // loadPage: () => {
    //   createDOM();
    // },
    // sort: (e) => {
    //   const sortType = e.target.id.split('-').pop();
    //   const sortOrder = e.target.classList.contains('asc') ? 1 : -1;

    //   lessons.sort(dynamicSort(sortOrder, sortType));

    //   addSortClass(e.target);
    //   addSortArrow(e.target);
    //   createDOM();
    // },
    // goToLesson: (e) => {
    //   if (e.target.parentElement.classList.contains('lesson-link')) {
    //     location.assign(`lessons/${e.target.parentElement.id}`);
    //   }
    // },
  };
})();

export { searchLessonsUI };
