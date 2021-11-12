import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Modal } from '../Modal';

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
    imagesCount: null,
    showModal: false,
  };

  handleClick = ({ imageIdx, imagesCount }) => {
    this.setState({ imageIdx, imagesCount });
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
        <ul className='ImageGallery'>
          {images.map(({ id, webformatURL, tags }, imageIdx) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={() =>
                this.handleClick({ imageIdx, imagesCount: images.length })
              }
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
