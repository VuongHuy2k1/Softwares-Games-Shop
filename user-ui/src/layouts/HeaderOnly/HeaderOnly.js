<<<<<<< HEAD
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import styles from "./HeaderOnly.module.scss";
=======
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Header from 'src/layouts/components/Header';
import Footer from 'src/layouts/components/Footer';
import styles from './HeaderOnly.module.scss';
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
  return (
<<<<<<< HEAD
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
=======
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
      </div>
      <Footer />
    </div>
  );
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};
export default HeaderOnly;
