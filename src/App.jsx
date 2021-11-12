import { Component } from 'react';
import { Searchbar } from './components/Searchbar';
import { ImageGallery } from './components/ImageGallery';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
import { ReactComponent as PixabayLogo } from './images/pixabay-logo.svg';
import { fetchImages } from './api/pixabay';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    message: '',
    status: Status.IDLE,
  };

  getSnapshotBeforeUpdate() {
    return window.scrollY;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page } = this.state;

    if (query === prevState.query && page === prevState.page) return;

    this.switchStatus(Status.PENDING);

    try {
      const { hits: newImages, totalHits } = await fetchImages({ query, page });

      if (!totalHits) {
        throw new Error(
          'Sorry, there are no images matching your search query.',
        );
      }

      if (!newImages.length) {
        throw new Error(
          `We're sorry, but you've reached the end of search results.`,
        );
      }

      if (page === 1) this.resetImages();
      this.addImages(newImages);
      this.switchStatus(Status.RESOLVED);

      if (page > 1) scrollBottom(snapshot);
    } catch ({ message }) {
      this.switchStatus(Status.REJECTED);
      this.setState({ message });
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  resetImages = () => {
    this.setState({ images: [] });
  };

  addImages = newImages => {
    this.setState(({ images }) => ({
      images: [...images, ...newImages],
    }));
  };

  switchStatus = newStatus => {
    this.setState({ status: newStatus });
  };

  render() {
    const { images, message, status } = this.state;

    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />

        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <Button onClick={this.incrementPage} />}
        {status === Status.REJECTED && (
          <div>
            <h2>{message}</h2>
          </div>
        )}
        {status === Status.IDLE && (
          <div>
            <a
              href='https://pixabay.com/'
              target='_blank'
              rel='nofollow noreferrer'
              aria-label='pixabay'
            >
              <PixabayLogo width='400' />
            </a>
          </div>
        )}
      </div>
    );
  }
}

function scrollBottom(snapshot) {
  window.scrollTo({
    top: window.innerHeight + snapshot - 150,
    behavior: 'smooth',
  });
}

export default App;
