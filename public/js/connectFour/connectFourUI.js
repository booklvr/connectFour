/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const connectFourUI = (function () {
  const DOMStrings = {
    // BY CLASS

    allCells: '.cell:not(.row-top)',
    topCells: '.cell.row-top',
    resetButton: '.reset-btn',
    undoButton: '.undo-btn',
    fullScreenButton: '.full-screen-btn',

    newGameButton: '.new-game-btn',
    statusSpan: '.status',
    containerImage: '.container--image',

    gameBoard: '.game-board',
    gameContainer: '.container--game',
    // BY ID
    // email: '#email',

    //BY TYPE
    // body: 'body',
  };

  // DOM
  const DOM = {
    resetButton: document.querySelector(DOMStrings.resetButton),
    statusSpan: document.querySelector(DOMStrings.statusSpan),
    gameContainer: document.querySelector(DOMStrings.gameContainer),
    gameBoard: document.querySelector(DOMStrings.gameBoard),
    containerModals: document.querySelector(DOMStrings.containerModals),
    // body: document.querySelector(DOMStrings.body),
  };

  const allCells = document.querySelectorAll(DOMStrings.allCells);
  const topCells = document.querySelectorAll(DOMStrings.topCells);
  const imageRow = document.querySelectorAll(DOMStrings.containerImage);
  const modals = document.querySelectorAll(DOMStrings.containerModal);
  const exitModalBtn = document.querySelector(DOMStrings.exitModalBtn);

  // columns
  const column0 = [
    allCells[35],
    allCells[28],
    allCells[21],
    allCells[14],
    allCells[7],
    allCells[0],
    topCells[0],
  ];
  const column1 = [
    allCells[36],
    allCells[29],
    allCells[22],
    allCells[15],
    allCells[8],
    allCells[1],
    topCells[1],
  ];
  const column2 = [
    allCells[37],
    allCells[30],
    allCells[23],
    allCells[16],
    allCells[9],
    allCells[2],
    topCells[2],
  ];
  const column3 = [
    allCells[38],
    allCells[31],
    allCells[24],
    allCells[17],
    allCells[10],
    allCells[3],
    topCells[3],
  ];
  const column4 = [
    allCells[39],
    allCells[32],
    allCells[25],
    allCells[18],
    allCells[11],
    allCells[4],
    topCells[4],
  ];
  const column5 = [
    allCells[40],
    allCells[33],
    allCells[26],
    allCells[19],
    allCells[12],
    allCells[5],
    topCells[5],
  ];
  const column6 = [
    allCells[41],
    allCells[34],
    allCells[27],
    allCells[20],
    allCells[13],
    allCells[6],
    topCells[6],
  ];
  const columns = [
    column0,
    column1,
    column2,
    column3,
    column4,
    column5,
    column6,
  ];

  // rows
  const topRow = [
    topCells[0],
    topCells[1],
    topCells[2],
    topCells[3],
    topCells[4],
    topCells[5],
    topCells[6],
  ];
  const row0 = [
    allCells[0],
    allCells[1],
    allCells[2],
    allCells[3],
    allCells[4],
    allCells[5],
    allCells[6],
  ];
  const row1 = [
    allCells[7],
    allCells[8],
    allCells[9],
    allCells[10],
    allCells[11],
    allCells[12],
    allCells[13],
  ];
  const row2 = [
    allCells[14],
    allCells[15],
    allCells[16],
    allCells[17],
    allCells[18],
    allCells[19],
    allCells[20],
  ];
  const row3 = [
    allCells[21],
    allCells[22],
    allCells[23],
    allCells[24],
    allCells[25],
    allCells[26],
    allCells[27],
  ];
  const row4 = [
    allCells[28],
    allCells[29],
    allCells[30],
    allCells[31],
    allCells[32],
    allCells[33],
    allCells[34],
  ];
  const row5 = [
    allCells[35],
    allCells[36],
    allCells[37],
    allCells[38],
    allCells[39],
    allCells[40],
    allCells[41],
  ];
  const rows = [row0, row1, row2, row3, row4, row5, topRow];

  //VARIABLES
  let gameIsLive = true;
  let yellowIsNext = true;
  let lastMoveList = [];

  // HELPER FUNCTIONS

  const getClassListArray = (cell) => {
    const classList = cell.classList;
    return [...classList];
  };

  const getCellLocation = (cell) => {
    const classList = getClassListArray(cell);

    const rowClass = classList.find((className) => className.includes('row'));
    const colClass = classList.find((className) => className.includes('col'));
    const rowIndex = rowClass[4];
    const colIndex = colClass[4];
    const rowNumber = parseInt(rowIndex, 10);
    const colNumber = parseInt(colIndex, 10);

    return [rowNumber, colNumber];
  };

  const clearColorFromTop = (colIndex) => {
    const topCell = topCells[colIndex];
    topCell.classList.remove('yellow');
    topCell.classList.remove('red');
  };

  const getFirstOpenCellForColumn = (colIndex) => {
    const column = columns[colIndex];
    const columnWithoutTop = column.slice(0, 6);

    for (const cell of columnWithoutTop) {
      const classList = getClassListArray(cell);
      if (!classList.includes('yellow') && !classList.includes('red')) {
        return cell;
      }
    }

    return null;
  };

  const getColorOfCell = (cell) => {
    const classList = getClassListArray(cell);
    if (classList.includes('yellow')) return 'yellow';
    if (classList.includes('red')) return 'red';
    return null;
  };

  const checkWinningCells = (cells) => {
    if (cells.length < 4) return false;

    gameIsLive = false;
    for (const cell of cells) {
      cell.classList.add('win');
    }
    DOM.statusSpan.textContent = `${yellowIsNext ? 'Yellow' : 'Red'} has won!`;
    DOM.statusSpan.classList.remove('hidden');
    DOM.statusSpan.classList.add(`${yellowIsNext ? 'yellow' : 'red'}`);
    return true;
  };

  const checkStatusOfGame = (cell) => {
    const color = getColorOfCell(cell);
    if (!color) return;
    const [rowIndex, colIndex] = getCellLocation(cell);

    // Check horizontally
    let winningCells = [cell];
    let rowToCheck = rowIndex;
    let colToCheck = colIndex - 1;
    while (colToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        colToCheck--;
      } else {
        break;
      }
    }
    colToCheck = colIndex + 1;
    while (colToCheck <= 6) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        colToCheck++;
      } else {
        break;
      }
    }
    let isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check vertically
    winningCells = [cell];
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex;
    while (rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex + 1;
    while (rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check diagonally /
    winningCells = [cell];
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
        colToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
        colToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check diagonally \
    winningCells = [cell];
    rowToCheck = rowIndex - 1;
    colToCheck = colIndex - 1;
    while (colToCheck >= 0 && rowToCheck >= 0) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck--;
        colToCheck--;
      } else {
        break;
      }
    }
    rowToCheck = rowIndex + 1;
    colToCheck = colIndex + 1;
    while (colToCheck <= 6 && rowToCheck <= 5) {
      const cellToCheck = rows[rowToCheck][colToCheck];
      if (getColorOfCell(cellToCheck) === color) {
        winningCells.push(cellToCheck);
        rowToCheck++;
        colToCheck++;
      } else {
        break;
      }
    }
    isWinningCombo = checkWinningCells(winningCells);
    if (isWinningCombo) return;

    // Check to see if we have a tie
    const rowsWithoutTop = rows.slice(0, 6);
    for (const row of rowsWithoutTop) {
      for (const cell of row) {
        const classList = getClassListArray(cell);
        if (!classList.includes('yellow') && !classList.includes('red')) {
          return;
        }
      }
    }

    gameIsLive = false;
    DOM.statusSpan.textContent = 'Game is a tie!';
  };

  const hoverImage = (columnIndex) => {
    imageRow[columnIndex].classList.add('hover');
  };

  const removeHoverImage = (columnIndex) => {
    imageRow[columnIndex].classList.remove('hover');
  };

  const getFullscreenElement = (el) => {
    // console.log('GET FULL SCREEN ELEMENT FUNCTION');
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement
    );
  };

  // const toggleFullScreen = (el) => {
  //   if (getFullScreen(el)) {
  //     el.exitFullScreen();
  //   } else {
  //     el.requestFullScreen().catch(console.log);
  //   }
  // };

  // RETURN FUNCTIONS
  return {
    getDOMStrings: () => DOMStrings,

    getColumnsAndRows: () => [columns, rows],

    handleCellMouseOver: (e) => {
      // console.log('handleCellMouseOver()');
      if (!gameIsLive) return;
      const cell = e.target;
      const [rowIndex, colIndex] = getCellLocation(cell);

      const topCell = topCells[colIndex];
      topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
      hoverImage(colIndex);
    },
    handleCellMouseOut: (e) => {
      // console.log('handlecellMouseOut()');
      const cell = e.target;
      const [rowIndex, colIndex] = getCellLocation(cell);
      clearColorFromTop(colIndex);
      removeHoverImage(colIndex);
    },
    handleCellClick: (e) => {
      if (!gameIsLive) return;
      const cell = e.target;

      const [rowIndex, colIndex] = getCellLocation(cell);

      const openCell = getFirstOpenCellForColumn(colIndex);

      if (!openCell) return;

      // add the cell move list for undo function
      lastMoveList.push(openCell);

      openCell.classList.add(yellowIsNext ? 'yellow' : 'red');
      checkStatusOfGame(openCell);

      yellowIsNext = !yellowIsNext;
      clearColorFromTop(colIndex);
      if (gameIsLive) {
        const topCell = topCells[colIndex];
        topCell.classList.add(yellowIsNext ? 'yellow' : 'red');
      }
    },
    resetGame: () => {
      for (const row of rows) {
        for (const cell of row) {
          cell.classList.remove('red');
          cell.classList.remove('yellow');
          cell.classList.remove('win');
        }
      }
      gameIsLive = true;
      yellowIsNext = true;
      DOM.statusSpan.textContent = '';
      DOM.statusSpan.classList.add('hidden');
      DOM.statusSpan.classList.remove(`yellow`);
      DOM.statusSpan.classList.remove('red');
    },
    undoLastMove: () => {
      // console.log('UNDO LAST MOVE FUNCTION');
      const lastCell = lastMoveList.pop();
      // console.log(lastCell);
      yellowIsNext = !yellowIsNext;
      lastCell.classList.remove('red');
      lastCell.classList.remove('yellow');
      lastCell.classList.remove('win');

      if (!gameIsLive) {
        gameIsLive = true;

        for (const row of rows) {
          for (const cell of row) {
            cell.classList.remove('win');
          }
        }

        DOM.statusSpan.classList.add('hidden');
        DOM.statusSpan.classList.remove(`yellow`);
        DOM.statusSpan.classList.remove('red');
      }
    },
    // openQuestionModal: (e) => {
    //   DOM.body.classList.add('modal-visible');
    //   DOM.containerModals.classList.remove('hidden');
    //   const imgCell = e.target.parentElement.parentElement;
    //   const modalIndex = imgCell.id.split('-').pop();
    //   console.log(modalIndex);
    //   console.log(modals[modalIndex]);
    //   modals[modalIndex].classList.remove('hidden');
    // },
    // closeQuestionModal: (e) => {
    //   console.log(e.target);
    //   const exitBtn = e.target.parentElement;
    //   const modalIndex = exitBtn.id.split('-').pop();
    //   console.log(modalIndex);
    //   modals[modalIndex].classList.add('hidden');
    // },
    toggleFullScreen: (e) => {
      if (getFullscreenElement(DOM.gameContainer)) {
        document.exitFullscreen().catch(console.log);
        // DOM.gameBoard.classList.remove('full-screen-game-board');
      } else {
        DOM.gameContainer.requestFullscreen().catch(console.log);
        // DOM.gameBoard.classList.add('full-screen-game-board');
      }
    },
    newGame: () => {
      window.location.reload();
    },
    onFullScreenChange: (e) => {
      console.log('EXIT HANDLER FUNCTION');
      if (getFullscreenElement(DOM.gameContainer)) {
        DOM.gameBoard.classList.add('full-screen-game-board');
      } else {
        DOM.gameBoard.classList.remove('full-screen-game-board');
      }
    },
    //   console.log(e.target);
    //   if (DOM.gameContainer.requestFullscreen) {
    //     DOM.gameContainer.requestFullscreen();
    //   } else if (DOM.gameContainer.webkitRequestFullscreen) {
    //     /* Safari */
    //     DOM.gameContainer.webkitRequestFullscreen();
    //   } else if (DOM.gameContainer.msRequestFullscreen) {
    //     /* IE11 */
    //     DOM.gameContainer.msRequestFullscreen();
    //   }
    //   DOM.gameBoard.classList.add('full-screen-game-board');
    // },
  };
})();

export { connectFourUI };
