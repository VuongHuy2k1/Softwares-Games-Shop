//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from 'src/config';
import Button from 'src/components/Button';
import WishListItem from '../WishListItem';
import { getWishlist, wishlistSelector } from 'src/store/reducers/wishlistSlice';
import styles from './WishList.module.scss';
const cx = classNames.bind(styles);
function WishList() {
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelector);
  const [wishlistData, setWishlistData] = useState([]);
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    setWishlistData(wishlist.data || []);
  }, [wishlist]);
  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>DANH SÁCH ƯỚC ({wishlistData.length})</h2>
        <div className={cx('content')}>
          <div className={cx('wishlist-container')}>
            {wishlistData.length > 0 ? (
              wishlistData.map((item, index) => {
                return <WishListItem key={item.gameID} data={item} />;
              })
            ) : (
              <div className={cx('empty-wishlist')}>
                <h2>Bạn không có dự định gì</h2>
                <Button to={config.routes.home} className={cx('shopping-button')}>
                  Trở về Trang chủ
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

//WishList.propTypes = {}

export default WishList;
