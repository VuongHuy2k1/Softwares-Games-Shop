//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from 'src/config';

import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
  document.title = '404 NOT FOUND';

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>404 NOT FOUND</h1>
      <span className={cx('loading')}></span>
      <Link to={config.routes.home} className={cx('link')}>
        Back to the Store
      </Link>
    </div>
  );
}

export default NotFound;
