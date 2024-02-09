export const API_TASK = 'http://crossw.ru/api/task.php';
export const API_TASKS = 'http://crossw.ru/api/tasks.php';

const checkFetchResponse = (res) => {
  return res.ok 
    ? res.json()
    : Promise.reject(`Ошибка Fetch: ${res.status}`);
};

const checkSuccess = (data) => {
  return data && data.success 
  ? data
  : Promise.reject(`Ошибка: Fetch не success: ${data}`);
};

const getTask = (endpoint, task, options) => {
  return fetch(`${API_TASK}${endpoint}?task=${task}`, options)
    .then(checkFetchResponse)
    .then(checkSuccess);
};

const getTasks = (endpoint, options) => {
  return fetch(`${API_TASKS}${endpoint}`, options)
    .then(checkFetchResponse)
    .then(checkSuccess);
};

export {
  getTask,
  getTasks
}