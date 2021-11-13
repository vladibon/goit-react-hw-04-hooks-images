import PropTypes from 'prop-types';
import s from './Notification.module.css';

const Notification = ({ message, onClick }) => (
  <div className={s.container} onClick={onClick}>
    <p className={s.message}>{message}</p>
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { Notification };
