import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onClick }) => (
  <li className={s.galleryItem} onClick={onClick}>
    <img className={s.galleryImage} src={webformatURL} alt={tags} />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export { ImageGalleryItem };
