import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
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

    if (!query.trim()) return;

    this.props.onSubmit(query.toLowerCase());

    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button
            type='submit'
            className={s.SearchFormButton}
            aria-label='Search images'
          >
            <ImSearch style={{ width: 22, height: 22 }} />
          </button>

          <input
            className={s.SearchFormInput}
            type='text'
            name='searchQuery'
            value={query}
            autoComplete='off'
            autoFocus
            placeholder='Search images'
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export { Searchbar };
