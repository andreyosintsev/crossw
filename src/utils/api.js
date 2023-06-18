import { saveTaskToLocalStorage } from './local-storage';

export const API = 'http://localhost/api/api.php';

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

const request = (endpoint, options) => {
  return fetch(`${API}${endpoint}`, options)
    .then(checkFetchResponse)
    .then(checkSuccess);
};

const loadTask = () => {
  try {  
    request('/')
    .then(data=> {
      console.log(data);
      saveTaskToLocalStorage(data);
    })
    .catch((error) => {
      console.error (`Ошибка Promise: ${error}`);
    });
  } catch (error) {
    console.error((`Не удалось получить task от API: ${error.message}`));
    throw new Error(`Не удалось получить task от API: ${error.message}`);
  }
};

export {
    loadTask
}