import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "../components/Sidebar/Sidebar";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Header />
      </div>
      <div className={cx("container")}>
        <div className={cx("siderbar")}>
          <Sidebar />
        </div>

        <div className={cx("content")}>{children}</div>
      </div>
      <div className={cx("footer")}>
        <Footer />
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
