import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from 'src/layouts/components/Header';
import Sidebar from 'src/layouts/components/Sidebar';
import Footer from 'src/layouts/components/Footer';

import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

function DefaultLayoutPro({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />

        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayoutPro.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayoutPro;
