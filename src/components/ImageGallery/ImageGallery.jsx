import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string,
        tags: PropTypes.string,
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
      const prevIdx = imageIdx - 1;

      return { imageIdx: prevIdx >= 0 ? prevIdx : imagesCount - 1 };
    });
  };

  render() {
    const { images } = this.props;
    const { imageIdx, showModal } = this.state;

    return (
      <>
        <ul className='ImageGallery'>
          {images.map(({ id, webformatURL, tags }, imageIdx) => (
            <li
              className='ImageGalleryItem'
              key={id}
              onClick={() =>
                this.handleClick({ imageIdx, imagesCount: images.length })
              }
            >
              <img
                className='ImageGalleryItem-image'
                src={webformatURL}
                alt={tags}
              />
            </li>
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
