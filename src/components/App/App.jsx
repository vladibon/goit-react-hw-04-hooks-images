import { Component } from 'react';
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

    try {
      const { totalHits, hits: newImages } = await fetchImages({ query, page });

      this.checkErrors(totalHits, newImages);
      this.addImages(newImages);

      if (page > 1) this.scrollBottom(snapshot);
    } catch ({ message }) {
      this.setState({ message, status: Status.REJECTED });
    }
  }

  checkErrors(totalHits, newImages) {
    if (!totalHits) {
      throw new Error('Sorry, there are no images matching your search query.');
    }

    if (!newImages.length) {
      throw new Error(
        `We're sorry, but you've reached the end of the search result.`,
      );
    }
  }

  scrollBottom(snapshot) {
    window.scrollTo({
      top: window.innerHeight + snapshot - 150,
      behavior: 'smooth',
    });
  }

  addImages = newImages => {
    this.setState(({ images }) => ({
      images: [...images, ...newImages],
      status: Status.RESOLVED,
    }));
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [], status: Status.PENDING });
  };

  handleNextLoad = () => {
    this.setState(({ page }) => ({ page: page + 1, status: Status.PENDING }));
  };

  render() {
    const { images, message, status } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />

        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <Button onClick={this.handleNextLoad} />}
        {status === Status.REJECTED && (
          <Notification
            message={message}
            onClick={() => this.setState({ status: Status.IDLE })}
          />
        )}
        {!images.length && (
          <Logo name='pixabay' url='https://pixabay.com/'>
            <PixabayLogo max-width='300' />
          </Logo>
        )}
      </div>
    );
  }
}

export default App;
