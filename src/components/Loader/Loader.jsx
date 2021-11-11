import Spinner from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => (
  <div className={s.loader}>
    <Spinner
      type='ThreeDots'
      color='#4d8679'
      height={100}
      width={100}
      timeout={3000}
    />
  </div>
);

export { Loader };
