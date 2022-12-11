import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import config from '../../../config/index.js';
import Button from '../../../components/Button/Button.js';
import styles from './DrawerRight.module.scss';
import * as authServices from 'src/services/authServices';
import * as imageServices from 'src/services/imageServices';
import 'react-modern-drawer/dist/index.css';
import React from 'react';
import { getUserData, userSelector } from 'src/store/reducers/userSlice';
import { getCart, cartSelector } from 'src/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from 'src/store/reducers/wishlistSlice';
import { getCheckout } from 'src/store/reducers/checkoutSlice';
const cx = classNames.bind(styles);

function DrawerRight() {
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

  const isLoggedIn = authServices.isLoggedIn();
  return (
    <div>
      <div className={cx('action-menu-container')}>
        {isLoggedIn ? (
          <>
            <div className={cx('action-menu')}>
              <Button wishlist to={config.routes.wishlist} className={cx('action-menu-button')}>
                {`WISHLIST (${wishlistData.length})`}
              </Button>
              <Button cart to={config.routes.cart} className={cx('action-menu-button')}>
                {`CART (${cartData.length})`}
              </Button>
            </div>
            <div className={cx('action-menu')}>
              <div className={cx('user-info')}>
                <div className={cx('user-name')}>
                  <Link to="#">
                    {userName || '{name}'}
                    &nbsp;
                    <FontAwesomeIcon icon={faCaretDown} />
                  </Link>
                </div>
                <Link to={`/profile/${userName}`} className={cx('avatar')}>
                  <img alt="avatar" src={imageServices.getImage(avatar)} />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={cx('action-menu')}>
              <Button btn btnAnimation to={config.routes.login} className={cx('action-menu-button')}>
                <span></span>
                <span></span>
                <span></span>
                <span>Đăng nhập</span>
              </Button>
            </div>
            <div className={cx('action-menu')}>
              <Button text to={config.routes.signup} className={cx('action-menu-button')}>
                ĐĂNG KÝ
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DrawerRight;
