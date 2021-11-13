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
    imagesCount: null,
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

  componentDidUpdate(prevProps, prevState) {
    const { images } = this.props;

    if (images === prevProps.images) return;

    this.setState({ imagesCount: images.length });
  }

  handleClick = imageIdx => {
    this.setState({ imageIdx });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setNextImage = () => {
    this.setState(({ imageIdx, imagesCount }) => {
      const nextIdx = imageIdx + 1;

      return { imageIdx: nextIdx < imagesCount ? nextIdx : 0 };
    });
  };

  setPrevImage = () => {
    this.setState(({ imageIdx, imagesCount }) => {
      const nextIdx = imageIdx - 1;

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
            toggleModal={this.toggleModal}
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
