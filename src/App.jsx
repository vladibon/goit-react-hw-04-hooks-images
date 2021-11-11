import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './components/Searchbar';
import { ImageGallery } from './components/ImageGallery';

class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSubmit = query => {
    this.setState({ query, page: 1 });
  };

  incrementPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { query, page } = this.state;

    return (
      <div className='App'>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          query={query}
          page={page}
          incrementPage={this.incrementPage}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
