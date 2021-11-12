import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => (
  <li className='ImageGalleryItem' onClick={onClick}>
    <img className='ImageGalleryItem-image' src={webformatURL} alt={tags} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export { ImageGalleryItem };
