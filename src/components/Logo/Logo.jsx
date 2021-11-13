import PropTypes from 'prop-types';
import s from './Logo.module.css';

const Logo = ({ url, name, children }) => (
  <div className={s.container}>
    <a
      className={s.link}
      href={url}
      target='_blank'
      rel='nofollow noreferrer'
      aria-label={name}
    >
      {children}
    </a>
  </div>
);

Logo.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export { Logo };
