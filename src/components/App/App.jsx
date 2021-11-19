import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Notification } from 'components/Notification';
import { Logo } from 'components/Logo';
import { fetchImages } from 'api/pixabay';
import { ReactComponent as PixabayLogo } from 'images/pixabay-logo.svg';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  const checkErrors = (totalHits, hits) => {
    if (!totalHits) {
      throw new Error('Sorry, there are no images matching your search query.');
    }

    if (!hits.length) {
      throw new Error(
        `We're sorry, but you've reached the end of the search result.`,
      );
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollBottom = () => {
    window.scrollTo({
      top: window.innerHeight + window.scrollY - 150,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!query) return;

    loadImages();

    async function loadImages() {
      setStatus(Status.PENDING);

      try {
        const { totalHits, hits } = await fetchImages(query, page);

        checkErrors(totalHits, hits);
        setImages(images => [...images, ...hits]);
        setStatus(Status.RESOLVED);
        page !== 1 && scrollBottom();
      } catch ({ message }) {
        setMessage(message);
        setStatus(Status.REJECTED);
      }
    }
  }, [query, page]);

  const handleSubmit = newQuery => {
    if (newQuery === query) return scrollTop();

    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmit} />

      {!images.length ? (
        <Logo name='pixabay' url='https://pixabay.com/'>
          <PixabayLogo max-width='300' />
        </Logo>
      ) : (
        <ImageGallery images={images} />
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <Button onClick={() => setPage(page => page + 1)} />
      )}
      {status === Status.REJECTED && (
        <Notification
          message={message}
          onClick={() => setStatus(Status.IDLE)}
        />
      )}
    </div>
  );
}

export default App;
