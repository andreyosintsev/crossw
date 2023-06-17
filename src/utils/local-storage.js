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

export {  saveBoardToLocalStorage,
          loadBoardFromLocalStorage,
          clearBoardInLocalStorage}