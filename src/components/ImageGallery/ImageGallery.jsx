import { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { ImageGalleryList } from '../ImageGalleryList';
import { Button } from '../Button';
import { fetchImages } from '../../api/pixabay';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
    page: PropTypes.number.isRequired,
    incrementPage: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    status: Status.IDLE,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return window.scrollY;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page } = this.props;
    const isSameQuery = query === prevProps.query;
    const isSamePage = page === prevProps.page;

    if (isSameQuery && isSamePage) return;

    this.switchStatus(Status.PENDING);

    try {
      const { hits: newImages } = await fetchImages({ query, page });

      if (!newImages.length) {
        this.switchStatus(Status.IDLE);

        return toast.warn(
          'Sorry, there are no images matching your search query!',
        );
      }

      if (!isSameQuery) this.resetImages();

      this.addImages(newImages);
      this.switchStatus(Status.RESOLVED);

      if (page > 1) this.scrollBottom(snapshot);
    } catch ({ message }) {
      this.switchStatus(Status.REJECTED);
      toast.error(message);
    }
  }

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

  scrollBottom(snapshot) {
    window.scrollTo({
      top: window.outerHeight + snapshot,
      behavior: 'smooth',
    });
  }

  render() {
    const { incrementPage } = this.props;
    const { images, status } = this.state;

    console.log(status);

    return (
      <>
        <ImageGalleryList images={images} />

        {status === Status.PENDING && (
          <Loader
            type='Puff'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000}
          />
        )}

        {status === Status.RESOLVED && <Button onClick={incrementPage} />}
      </>
    );
  }
}

export { ImageGallery };
