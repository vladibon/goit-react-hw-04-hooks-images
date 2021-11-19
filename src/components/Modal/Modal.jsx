import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ closeModal, setNextImage, setPrevImage, children }) {
  useEffect(() => {
    const handleKeyDown = ({ code }) => {
      code === 'Escape' && closeModal();
      code === 'ArrowRight' && setNextImage();
      code === 'ArrowLeft' && setPrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal, setNextImage, setPrevImage]);

  const handleOverlayClick = ({ currentTarget, target }) => {
    currentTarget === target && closeModal();
  };

  return createPortal(
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setNextImage: PropTypes.func.isRequired,
  setPrevImage: PropTypes.func.isRequired,
};

export { Modal };
