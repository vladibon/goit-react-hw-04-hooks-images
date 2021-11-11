import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button className='Button' type='button' onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
};

export { Button };
