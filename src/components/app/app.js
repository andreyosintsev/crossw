import { useState, useEffect } from 'react';

import AppStyles from './app.module.css';

import Table from '../table/table';
import Modal from '../modal/modal';
import Preloader from '../preloader/preloader';

import { request } from '../../utils/api';
import { loadTaskFromLocalStorage, saveTaskToLocalStorage } from '../../utils/local-storage';

function App() {
  const [loading, setLoading] = useState(
    {
    isLoading: true,
    hasError: false,
    loaded: false
    }
  );
  const [modalShow, setModalShow] = useState(false);

  const closeHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
    setLoading({ isLoading: true, hasError: false, isLoaded: true });
    loadTask();
  };

  const loadTask = () => {
    console.log('In loadTask');
    try {  
      request('/'
      )
      .then(data=> {
        console.log('In loadTask: then');
        console.log('APP loadTask: task loaded');
        saveTaskToLocalStorage(data);
        console.log('In loadTask: saved to localStorage');
        setLoading({ isLoading: false, hasError: false, isLoaded: true });
      })
      .catch((error) => {
        console.log('In loadTask: error');
        console.error (`Ошибка Promise: ${error}`);
        setLoading({ isLoading: false, hasError: true, isLoaded: false});
        setModalShow(true);
      });
    } catch (error) {
      console.log('In loadTask: catch error');
      console.error((`Не удалось получить task от API: ${error.message}`));
      setLoading({ isLoading: false, hasError: true, isLoaded: false});
      setModalShow(true);
    }
  };

  useEffect(()=> {
    if (!loadTaskFromLocalStorage()) {
      setLoading({ isLoading: true, hasError: false, isLoaded: true });
      loadTask();
    } else {
      setLoading({ isLoading: false, hasError: false, isLoaded: true });
    }
  }, []);

  return (
      <div className={AppStyles.wrapper}>
        <div className={AppStyles.app}>
          <h1 className={AppStyles.title}>Picross game</h1>
          <main className={AppStyles.main}>
          {!loading.isLoading && !loading.hasError && 
            <Table/>
          }
          {loading.isLoading && 
            <Preloader />          
          }
          {loading.hasError && modalShow &&
            <Modal image="modal1.png" onClick={closeHandler}>Ошибка загрузки кроссворда.</Modal>
          }
          </main>
          <footer className={AppStyles.footer}>
            &copy;2023 Picross World
          </footer>
        </div>
      </div>
  );
}

export default App;