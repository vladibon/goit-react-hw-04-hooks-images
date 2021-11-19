import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Modal } from 'components/Modal';
import s from './ImageGallery.module.css';

function ImageGallery({ images }) {
  const [imageIdx, setImageIdx] = useState(NaN);

  const closeModal = () => {
    setImageIdx(NaN);
  };

  const setNextImage = () => {
    setImageIdx(idx => (idx + 1 < images.length ? idx + 1 : 0));
  };

  const setPrevImage = () => {
    setImageIdx(idx => (idx - 1 >= 0 ? idx - 1 : images.length - 1));
  };

  return (
    <>
      <ul className={s.gallery}>
        {images.map(({ id, webformatURL, tags }, imageIdx) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={() => setImageIdx(imageIdx)}
          />
        ))}
      </ul>

      {!isNaN(imageIdx) && (
        <Modal
          closeModal={closeModal}
          setNextImage={setNextImage}
          setPrevImage={setPrevImage}
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

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export { ImageGallery };
