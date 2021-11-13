import Spinner from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => (
  <div className={s.loader}>
    <Spinner
      type='ThreeDots'
      color='#3d8679'
      height={110}
      width={110}
      timeout={3000}
    />
  </div>
);

export { Loader };
