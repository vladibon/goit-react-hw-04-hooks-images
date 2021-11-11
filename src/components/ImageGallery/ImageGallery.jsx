import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImageGalleryList } from '../ImageGalleryList';
import { Button } from '../Button';
import { Loader } from '../Loader';
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

  getSnapshotBeforeUpdate() {
    return window.scrollY;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { query, page } = this.props;

    if (query === prevProps.query && page === prevProps.page) return;
    this.switchStatus(Status.PENDING);

    try {
      const { hits: newImages } = await fetchImages({ query, page });

      if (!newImages.length) {
        this.switchStatus(Status.IDLE);

        return toast.warn(
          'Sorry, there are no images matching your search query!',
        );
      }

      if (page === 1) this.resetImages();
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
      top: window.innerHeight + snapshot - 150,
      behavior: 'smooth',
    });
  }

  render() {
    const { incrementPage } = this.props;
    const { images, status } = this.state;

    console.dir(document);

    return (
      <>
        <ImageGalleryList images={images} />
        {status === Status.RESOLVED && <Button onClick={incrementPage} />}
        {status === Status.PENDING && <Loader />}
      </>
    );
  }
}

export { ImageGallery };
