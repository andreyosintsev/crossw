import { useState, useEffect } from 'react';

import AppStyles from './app.module.css';

import Modal from '../modal/modal';
import Preloader from '../preloader/preloader';
import Panel from '../panel/panel';
import Table from '../table/table';
import Controls from './controls/controls';
import ModalButton from '../modal-button/modal-button';
import Tasks from '../tasks/tasks';

import {  getTask,
          getTasks } from '../../utils/api';

import {  loadTaskFromLocalStorage, 
          saveTaskToLocalStorage,
          clearTaskInLocalStorage,
          loadTasksFromLocalStorage, 
          saveTasksToLocalStorage,
          clearTasksInLocalStorage,
          clearBoardInLocalStorage } from '../../utils/local-storage';

function App() {
  const [taskLoading, setTaskLoading] = useState(
    {
    isLoading: true,
    hasError: false,
    loaded: false
    }
  );

  const [tasksLoading, setTasksLoading] = useState(
    {
    isLoading: true,
    hasError: false,
    loaded: false
    }
  );

  const [modalShow, setModalShow] = useState(false);
  const [isRestart, setRestart] = useState(false);
  const [isHelp, setHelp] = useState(false);

  const closeHandler = (e) => {
    e.preventDefault();
    setModalShow(false);
    setTaskLoading({ isLoading: true, hasError: false, isLoaded: false });
    loadTask();
  };

  const loadTasks = () => {
    console.log('In loadTasks');
    try {  
      getTasks('', 
      )
      .then(data=> {
        console.log('In loadTasks: then');
        console.log('APP loadTasks: tasks loaded');
        saveTasksToLocalStorage(data);
        console.log('In loadTasks: saved to localStorage');
        setTasksLoading({ isLoading: false, hasError: false, isLoaded: true });
      })
      .catch((error) => {
        console.log('In loadTasks: error');
        console.error (`Ошибка Promise: ${error}`);
        setTasksLoading({ isLoading: false, hasError: true, isLoaded: false});
        setModalShow(true);
      });
    } catch (error) {
      console.log('In loadTasks: catch error');
      console.error((`Не удалось получить tasks от API: ${error.message}`));
      setTasksLoading({ isLoading: false, hasError: true, isLoaded: false});
      setModalShow(true);
    }

  };

  const loadTask = () => {
    console.log('In loadTask');
    //////////////////////////////////////////////////////////////////
    // const data = {    
    //   "task": [
    //     "0", "0", "1", "0", "0", "0", "0", "1", "0",
    //     "0", "1", "0", "1", "0", "0", "1", "0", "1",
    //     "1", "1", "1", "1", "1", "0", "1", "0", "1",
    //     "1", "0", "0", "0", "1", "0", "0", "1", "0",
    //     "1", "0", "0", "0", "1", "0", "0", "1", "0",
    //     "1", "1", "1", "1", "1", "0", "0", "1", "0"
    //   ],
    //   "width": 9,
    //   "height": 6,
    //   "success": "true"
    // };

    // saveTaskToLocalStorage(data);
    // setLoading({ isLoading: false, hasError: false, isLoaded: true });
    // //////////////////////////////////////////////////////////////////
    try {  
      getTask('', 2 
      )
      .then(data=> {
        console.log('In loadTask: then');
        console.log('APP loadTask: task loaded');
        saveTaskToLocalStorage(data);
        console.log('In loadTask: saved to localStorage');
        setTaskLoading({ isLoading: false, hasError: false, isLoaded: true });
      })
      .catch((error) => {
        console.log('In loadTask: error');
        console.error (`Ошибка Promise: ${error}`);
        setTaskLoading({ isLoading: false, hasError: true, isLoaded: false});
        setModalShow(true);
      });
    } catch (error) {
      console.log('In loadTask: catch error');
      console.error((`Не удалось получить task от API: ${error.message}`));
      setTaskLoading({ isLoading: false, hasError: true, isLoaded: false});
      setModalShow(true);
    }
    //////////////////////////////////////////////////////////////////
  };

  const restartHandler = (e) => {
    clearBoardInLocalStorage();
    clearTaskInLocalStorage();
    setHelp(false);
    setTaskLoading({ isLoading: true, hasError: false, isLoaded: true });
    loadTask();
    loadTasks();
    setRestart(true);
  };

  const helpHandler = () => {
    const data = loadTaskFromLocalStorage();
    let help = {};
    let pos = 0;
    if (data && data.task) {
      while (true) {
        pos = Math.floor(Math.random() * data.task.length);
        if (data.task[pos] === "1") { 
          break;
        }
      }
      help.content = data.task[pos];
      help.pos = pos;
    } else {
      help = false;
    }
    setHelp(help);
  };

  useEffect(()=> {
    console.log('APP REDRAW!!');
    if (!loadTaskFromLocalStorage()) {
      setTaskLoading({ isLoading: true, hasError: false, isLoaded: false });
      loadTask();
    } else {
      setTaskLoading({ isLoading: false, hasError: false, isLoaded: true });
    }
    if (!loadTasksFromLocalStorage()) {
      setTasksLoading({ isLoading: true, hasError: false, isLoaded: false });
      loadTasks();
    } else {
      setTasksLoading({ isLoading: false, hasError: false, isLoaded: true });
    }
    setRestart(false);
  }, [isRestart]);

  return (
    <>
            <aside>
              <Tasks />
            </aside>
            <main className={AppStyles.main}>
            {!taskLoading.isLoading && !taskLoading.hasError && 
              <Panel>
                <Table help={isHelp}/>
                <Controls onRestart={restartHandler} onHelp={helpHandler}/>
              </Panel>
            }
            {taskLoading.isLoading && 
              <Preloader />          
            }
            {taskLoading.hasError && modalShow &&  
              <Modal image="modal1.png" title="Ошибка загрузки кроссворда." onClick={closeHandler}>
                <ModalButton onClick={closeHandler}>Закрыть</ModalButton>
              </Modal>
            }
            </main>
    </>
  );
}

export default App