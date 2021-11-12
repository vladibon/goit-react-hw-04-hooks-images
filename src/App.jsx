import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from './components/Searchbar';
import { ImageGallery } from './components/ImageGallery';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
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
    status: Status.IDLE,
  };

  componentDidMount() {
    this.setState({ query: 'top' });
  }

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
      toast.error(message);
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
    const { images, status } = this.state;

    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />

        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <Button onClick={this.incrementPage} />}

        <ToastContainer autoClose={3000} />
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
