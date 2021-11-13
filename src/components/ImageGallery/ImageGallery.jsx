import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Modal } from 'components/Modal';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  state = {
    imageIdx: null,
    showModal: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.images !== this.props.images ||
      nextState.imageIdx !== this.state.imageIdx ||
      nextState.showModal !== this.state.showModal
    );
  }

  handleClick = imageIdx => {
    this.setState({ imageIdx, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  setNextImage = () => {
    this.setState(({ imageIdx }) => {
      const nextIdx = imageIdx + 1;
      const imagesCount = this.props.images.length;

      return { imageIdx: nextIdx < imagesCount ? nextIdx : 0 };
    });
  };

  setPrevImage = () => {
    this.setState(({ imageIdx }) => {
      const nextIdx = imageIdx - 1;
      const imagesCount = this.props.images.length;

      return { imageIdx: nextIdx >= 0 ? nextIdx : imagesCount - 1 };
    });
  };

  render() {
    const { images } = this.props;
    const { imageIdx, showModal } = this.state;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, tags }, imageIdx) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={() => this.handleClick(imageIdx)}
            />
          ))}
        </ul>

        {showModal && (
          <Modal
            closeModal={this.closeModal}
            setNextImage={this.setNextImage}
            setPrevImage={this.setPrevImage}
          >
            <img
              src={images[imageIdx].largeImageURL}
              alt={images[imageIdx].tags}
            />
          </Modal>
        )}
      </>
    );
  }
}

export { ImageGallery };
