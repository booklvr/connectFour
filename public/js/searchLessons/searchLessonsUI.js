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
    sortArrows: '.btn--sort-arrow',
    lessonDataContainer: '.container--lesson-data',

    // BY ID
    sortPlays: '#sort-plays',
    sortTitle: '#sort-title',
    sortQuestions: 'sort-questions',
    sortTarget: '#sort-target',
    sortCreatedAt: '#sort-created-at',

    searchTitleInput: '#search-title',
    searchTargetInput: '#search-target',
    getMoreLessonsBtn: '#get-more-lessons-btn',

    // sortUpdatedAt: '#sort-updatedAt',
    // sortClass: '#sort-class',
    // sortChapter: '#sort-chapter',
  };

  const DOM = {
    lessonDataContainer: document.querySelector(DOMStrings.lessonDataContainer),
    sortArrows: document.querySelectorAll(DOMStrings.sortArrows),
    getMoreLessonsBtn: document.querySelector(DOMStrings.getMoreLessonsBtn),
  };

  // CONST VARIABLES
  let lessons = [];

  // query variables
  let sort = '-plays,title';
  let fields = 'plays,title,target,createdAt';
  let page = '1';
  let limit = '25';
  let title = '';
  let target = '';
  let allLessonsDelivered = false;

  // HELPER FUNCTIONS

  const getData = async () => {
    console.log('getting data');
    try {
      const res = await axios({
        method: 'GET',
        // url: `/api/v1/lessons?${filter}&${sort}&${fields}&${page}&${limit}`,
        url: `/api/v1/lessons`,
        params: {
          sort,
          fields,
          page,
          limit,
          title: title ? title : null,
          target: target ? target : null,
        },
      });

      if (res.data.status === 'success') {
        return res.data.data.data;
        console.log('lessons', lessons);

        // showAlert('success', 'Lessons Loaded Successfully');
        // window.setTimeout(() => {
        //   // location.assign(`/lessons/${res.data.data.data._id}`);
        // }, 1000);
      } else {
        showAlert('error', 'There was an error.  Could not load lessons');
      }
    } catch (err) {
      showAlert('error', 'There was a problem loading the lesson');
      console.log('try catch err', err);
      window.setTimeout(() => {
        location.reload();
      }, 3000);
    }
  };

  const addRow = (row, data) => {
    let newColumn = document.createElement('div');
    newColumn.className += 'column';

    newColumn.innerHTML = data ? data : '';

    // if (moment('2015-06-22T13:17:21+0000', moment.ISO_8601, true).isValid()) {
    //   newColumn.innerHTML = moment(data).format('l h:mm a');
    // } else {

    // }
    if (typeof data === 'number') {
      newColumn.classList.add('column--thin');
    }

    row.appendChild(newColumn);
  };

  const addDateRow = (row, data) => {
    let newColumn = document.createElement('div');
    newColumn.className += 'column';
    newColumn.innerHTML = moment(data).format('l h:mm a');

    row.appendChild(newColumn);
  };

  const createDOM = (lessons) => {
    console.log('create dom lessons', lessons);
    DOM.lessonDataContainer.innerHTML = '';
    lessons.forEach((lesson) => {
      const newRow = document.createElement('div');
      newRow.className += 'row lesson-link';
      newRow.setAttribute('id', lesson._id);
      addRow(newRow, lesson.plays);
      addRow(newRow, lesson.title);
      addRow(newRow, lesson.target);
      addDateRow(newRow, lesson.createdAt);
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
  // const dynamicSort = (sortOrder, property) => (a, b) =>
  //   sortOrder *
  //   (a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0);

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => {
      return DOMStrings;
    },

    loadPage: async () => {
      lessons = await getData();
      createDOM(lessons);
    },
    sort: async (e) => {
      console.log('sort this data');
      addSortClass(e.target);
      addSortArrow(e.target);
      let sortType = e.target.id.split('-').pop();
      const sortOrder = e.target.classList.contains('asc') ? 'asc' : 'desc';
      console.log('sortOrder', sortOrder);

      console.log('sortType', sortType);

      if (sortType === 'at') {
        sortType = 'createdAt';
      }

      console.log('sortType', sortType);

      sort = sortType;

      if (sortOrder === 'desc') {
        sort = '-' + sort;
      }

      lessons = await getData();
      createDOM(lessons);

      // lessons.sort(dynamicSort(sortOrder, sortType));

      // addSortClass(e.target);
      // addSortArrow(e.target);
      // createDOM();
    },
    search: async (e) => {
      console.log(e.target);
      let filterType = e.target.id.split('-').pop();
      console.log('filterType', filterType);

      if (filterType === 'title') {
        title = e.target.value;
      } else if (filterType === 'target') {
        target = e.target.value;
      }
      console.log('target', target);
      console.log('title', title);

      lessons = await getData();
      createDOM(lessons);
    },
    getMoreLessons: async (e) => {
      if (allLessonsDelivered) return;

      page = (Number(page) + 1).toString();
      const addLessons = await getData();

      if (addLessons.length === 0) {
        DOM.getMoreLessonsBtn.innerHTML = 'No more lessons';
        DOM.getMoreLessonsBtn.classList.remove('btn--blue');
        DOM.getMoreLessonsBtn.classList.add('btn--grey');
        DOM.getMoreLessonsBtn.style.cursor = 'default';
        allLessonsDelivered = true;
      }

      console.log('addLessons', addLessons);
      lessons = [...lessons, ...addLessons];
      console.log(lessons);
      createDOM(lessons);
    },
    goToLesson: (e) => {
      if (e.target.parentElement.classList.contains('lesson-link')) {
        location.assign(`lessons/${e.target.parentElement.id}`);
      }
    },
  };
})();

export { searchLessonsUI };
