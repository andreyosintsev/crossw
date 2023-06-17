import ReactDOM from 'react-dom';

import ModalBackdrop from '../modal-backdrop/modal-backdrop';

import ModalStyles from './modal.module.css';

const Modal = ({onClick, children}) => {

  const modalRoot = document.querySelector("#modals");

  return ReactDOM.createPortal(
    (
      <>
        <ModalBackdrop onClick={onClick} />
        <div className={`${ModalStyles.modal}`} onClick={onClick} >
          {children}
        </div>
      </>
    ), 
    modalRoot
  );
};

export default Modal