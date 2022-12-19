import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import styles from './HeaderOnlyPro.module.scss';

const cx = classNames.bind(styles);
function HeaderOnlyPro({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

HeaderOnlyPro.propTypes = {
  children: PropTypes.node.isRequired,
};
export default HeaderOnlyPro;
