export const API = '/api/api.php';

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

export {
  request
}