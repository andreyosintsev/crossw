function saveBoardToLocalStorage(board) {
  localStorage.setItem('crosswBoard', JSON.stringify(board));
}

function loadBoardFromLocalStorage() {
  const board = localStorage.getItem('crosswBoard');
  return board ? JSON.parse(board) : null;
}

function clearBoardInLocalStorage() {
  console.log('clearBoard');
  localStorage.removeItem('crosswBoard');
}

function saveTaskToLocalStorage(board) {
  localStorage.setItem('crosswTask', JSON.stringify(board));
}

function loadTaskFromLocalStorage() {
  const board = localStorage.getItem('crosswTask');
  return board ? JSON.parse(board) : null;
}

function clearTaskInLocalStorage() {
  console.log('clearTask');
  localStorage.removeItem('crosswTask');
}

function saveTasksToLocalStorage(board) {
  localStorage.setItem('crosswTasks', JSON.stringify(board));
}

function loadTasksFromLocalStorage() {
  const board = localStorage.getItem('crosswTasks');
  return board ? JSON.parse(board) : null;
}

function clearTasksInLocalStorage() {
  console.log('clearTasks');
  localStorage.removeItem('crosswTasks');
}

export {  saveBoardToLocalStorage,
          loadBoardFromLocalStorage,
          clearBoardInLocalStorage,
          saveTaskToLocalStorage,
          loadTaskFromLocalStorage,
          clearTaskInLocalStorage,
          saveTasksToLocalStorage,
          loadTasksFromLocalStorage,
          clearTasksInLocalStorage
        }