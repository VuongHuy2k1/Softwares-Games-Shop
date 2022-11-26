import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faNavicon } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames/bind';
import config from '../../../config/index.js';
import images from '../../../assets/images/index.js';
import Button from '../../../components/Button/Button.js';
import styles from './Drawer.module.scss';
import * as authServices from 'src/services/authServices';
import * as imageServices from 'src/services/imageServices';
import 'react-modern-drawer/dist/index.css';
import Navbar from '../Navbar';
import React from 'react';
import { navItems } from '../Header/NavItems.js';
import { useClickOutside } from 'src/hooks';
import { getUserData, userSelector } from 'src/store/reducers/userSlice';
import { getCart, cartSelector } from 'src/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from 'src/store/reducers/wishlistSlice';
import { getCheckout } from 'src/store/reducers/checkoutSlice';
import Header from '../Header/Header.js';
import Dropdown from 'src/components/Dropdown/Dropdown.js';
const cx = classNames.bind(styles);

function DrawerM() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const [storeDropdown, setStoreDropdown] = useState(false);
  const [communityDropdown, setCommunityDropdown] = useState(false);
  const [actionDropdown, setActionState] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getCart());
    dispatch(getWishlist());
    dispatch(getCheckout());
  }, [dispatch]);

  const user = useSelector(userSelector);
  const [userName, setUserName] = useState(undefined);
  const [avatar, setAvatar] = useState(undefined);

  useLayoutEffect(() => {
    if (user.data !== undefined) {
      setUserName(user.data.userName);
      setAvatar(user.data.avatarPath);
    }
  }, [user]);

  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useLayoutEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  const wishlist = useSelector(wishlistSelector);
  const [wishlistData, setWishlistData] = useState([]);
  useLayoutEffect(() => {
    setWishlistData(wishlist.data || []);
  }, [wishlist]);

  const handleClick = () => {
    setActionState(!actionDropdown);
  };

  const ActionMenuRef = useRef();
  const handleHide = () => {
    setActionState(false);
  };
  useClickOutside(ActionMenuRef, handleHide);

  const ActionMenuItems = [
    {
      id: 1,
      title: 'View Profile',
      path: `/profile/${userName}`,
    },
    {
      id: 2,
      title: 'Logout',
      path: '#',
      action: () => {
        const timerId = setTimeout(() => {
          clearTimeout(timerId);
          authServices.logout();
          navigate(config.routes.login, { replace: true });
        }, 2000);
      },
    },
  ];
  const renderNavItem = navItems.map((item) => {
    switch (item.title) {
      case 'Store':
        return (
          <li
            className={cx('navbar-item')}
            key={item.id}
            onMouseEnter={() => setStoreDropdown(true)}
            onMouseLeave={() => setStoreDropdown(false)}
          >
            <Link to={item.path}>{item.title}</Link>
          </li>
        );
      case 'Community':
        return (
          <li
            className={cx('navbar-item')}
            key={item.id}
            onMouseEnter={() => setCommunityDropdown(true)}
            onMouseLeave={() => setCommunityDropdown(false)}
          >
            <Link to={item.path}>{item.title}</Link>
          </li>
        );
      default:
        return (
          <li className={cx('navbar-item')} key={item.id}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        );
    }
  });
  const isLoggedIn = authServices.isLoggedIn();
  return (
    <div>
      <ul className={cx('header-navbar')}>{renderNavItem}</ul>
      <Navbar />
    </div>
  );
}

export default DrawerM;
