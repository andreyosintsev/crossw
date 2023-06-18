function saveBoardToLocalStorage(board) {
  localStorage.setItem('picrossBoard', JSON.stringify(board));
}

function loadBoardFromLocalStorage() {
  const board = localStorage.getItem('picrossBoard');
  return board ? JSON.parse(board) : null;
}

function clearBoardInLocalStorage() {
  localStorage.removeItem('picrossBoard');
}

function saveTaskToLocalStorage(board) {
  localStorage.setItem('picrossTask', JSON.stringify(board));
}

function loadTaskFromLocalStorage() {
  const board = localStorage.getItem('picrossTask');
  return board ? JSON.parse(board) : null;
}

function clearTaskInLocalStorage() {
  localStorage.removeItem('picrossTask');
}

export {  saveBoardToLocalStorage,
          loadBoardFromLocalStorage,
          clearBoardInLocalStorage,
          saveTaskToLocalStorage,
          loadTaskFromLocalStorage,
          clearTaskInLocalStorage
        }