<<<<<<< HEAD
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Dropdown.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Dropdown({
  items,
  navbar = false,
  storenav = false,
  search = false,
  actionMenu = false,
}) {
  const classes = cx("wrapper", {
=======
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Dropdown({ items, navbar = false, storenav = false, search = false, actionMenu = false }) {
  const classes = cx('wrapper', {
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    navbar,
    storenav,
    actionMenu,
  });

  return (
    <div className={classes}>
<<<<<<< HEAD
      <ul className={cx("subnav")}>
        {items.map((item) => {
          return (
            <li key={item.id} className={cx("subnav-item")}>
=======
      <ul className={cx('subnav')}>
        {items.map((item) => {
          return (
            <li key={item.id} className={cx('subnav-item')}>
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
              <Link to={item.path} onClick={item.action}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array,
  navbar: PropTypes.bool,
  storenav: PropTypes.bool,
  actionMenu: PropTypes.bool,
};
export default Dropdown;
