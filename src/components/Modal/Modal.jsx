import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    setNextImage: PropTypes.func.isRequired,
    setPrevImage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'unset';
  }

  handleKeyDown = ({ code }) => {
    code === 'Escape' && this.props.closeModal();
    code === 'ArrowRight' && this.props.setNextImage();
    code === 'ArrowLeft' && this.props.setPrevImage();
  };

  handleOverlayClick = ({ currentTarget, target }) => {
    currentTarget === target && this.props.closeModal();
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleOverlayClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

export { Modal };
