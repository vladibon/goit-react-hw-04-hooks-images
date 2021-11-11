import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    query: '',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.query !== this.state.query;
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;

    if (!query.trim()) {
      return toast.warn('Please enter your search query and try again!');
    }

    this.props.onSubmit(query.toLowerCase());

    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className='Searchbar'>
        <form className='SearchForm' onSubmit={this.handleSubmit}>
          <button
            type='submit'
            className='SearchForm-button'
            aria-label='Search images'
          >
            <ImSearch style={{ width: 22, height: 22 }} />
          </button>

          <input
            className='SearchForm-input'
            type='text'
            name='searchQuery'
            value={query}
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
