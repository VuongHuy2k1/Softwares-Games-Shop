import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-modern-drawer/dist/index.css';
import classNames from 'classnames/bind';

import styles from './Drawer.module.scss';
import Navbar from '../Navbar';
import { navItems } from '../Header/NavItems.js';
import { getUserData } from 'src/store/reducers/userSlice';
import { getCart } from 'src/store/reducers/cartSlice';
import { getWishlist } from 'src/store/reducers/wishlistSlice';
import { getCheckout } from 'src/store/reducers/checkoutSlice';

const cx = classNames.bind(styles);

function DrawerM() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getCart());
    dispatch(getWishlist());
    dispatch(getCheckout());
  }, [dispatch]);

  const renderNavItem = navItems.map((item) => {
    switch (item.title) {
      case 'Store':
        return (
          <li className={cx('navbar-item')} key={item.id}>
            <Link to={item.path}>{item.title_vi}</Link>
          </li>
        );
      case 'Community':
        return (
          <li className={cx('navbar-item')} key={item.id}>
            <Link to={item.path}>{item.title_vi}</Link>
          </li>
        );
      default:
        return (
          <li className={cx('navbar-item')} key={item.id}>
            <Link to={item.path}>{item.title_vi}</Link>
          </li>
        );
    }
  });
  return (
    <div>
      <ul className={cx('header-navbar')}>{renderNavItem}</ul>
      <Navbar />
    </div>
  );
}

export default DrawerM;
