import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => (
  <button className={s.button} type='button' onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { Button };
