import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryList extends Component {
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

  render() {
    const { images } = this.props;

    return (
      <ul className='ImageGallery'>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li className='ImageGalleryItem' key={id}>
            <img
              className='ImageGalleryItem-image'
              src={webformatURL}
              data-src={largeImageURL}
              alt={tags}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export { ImageGalleryList };
