import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    setNextImage: PropTypes.func.isRequired,
    setPrevImage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ code }) => {
    code === 'Escape' && this.props.toggleModal();
    code === 'ArrowRight' && this.props.setNextImage();
    code === 'ArrowLeft' && this.props.setPrevImage();
  };

  handleOverlayClick = ({ currentTarget, target }) => {
    currentTarget === target && this.props.toggleModal();
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className='Overlay' onClick={this.handleOverlayClick}>
        <div className='Modal'>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

export { Modal };
