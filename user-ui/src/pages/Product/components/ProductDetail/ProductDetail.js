import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductGallery from '../ProductGallery';
import { cartSelector, getCart } from 'src/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from 'src/store/reducers/wishlistSlice';
import * as cartServices from 'src/services/cartServices';
import * as wishlistServices from 'src/services/wishlistServices';
import * as imageServices from 'src/services/imageServices';
import * as authServices from 'src/services/authServices';

import ToastPortal from 'src/components/ToastPortal';
import { useNotification } from 'src/hooks';

import { currencyFormat } from 'src/utils';
import config from 'src/config';

import styles from './ProductDetail.module.scss';
const cx = classNames.bind(styles);

function ProductDetail({ data }) {
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const [value, setValue] = useState(data);
  useEffect(() => {
    setValue(data);
  }, [data]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const addToCart = async () => {
    setLoading(true);
    const response = await cartServices.addToCart({ gameID: data.gameID });
    if (response.isSuccess === true) {
      Notify('success', 'Add to Cart Successfully');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        dispatch(getCart());
      }, 3000);
    }
    if (response.isSuccess === false) {
      Notify('error', response.message);
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
      }, 3000);
    }
  };
  const handleClick = () => {
    addToCart();
  };

  const [loading2, setLoading2] = useState(false);
  const addToWishlist = async () => {
    setLoading2(true);
    const response = await wishlistServices.addToWishlist({ gameID: data.gameID });
    if (response.isSuccess === true) {
      Notify('success', 'Add to Wishlist Successfully');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading2(false);
        dispatch(getWishlist());
      }, 3000);
    }
    if (response.isSuccess === false) {
      Notify('error', response.message);
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading2(false);
      }, 3000);
    }
  };
  const handleAddToWishlist = () => {
    addToWishlist();
  };
  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  const wishlist = useSelector(wishlistSelector);
  const [wishlistData, setWishListData] = useState([]);
  useEffect(() => {
    setWishListData(wishlist.data || []);
  }, [wishlist]);

  const isLoggedIn = authServices.isLoggedIn();
  return (
    <>
      <div className={cx('wrapper')}>
        {value !== undefined ? (
          <>
            <div className={cx('container')}>
              <div className={cx('gallery')}>
                <ProductGallery data={value.listImage} />
              </div>
              <div className={cx('product-information')}>
                <div className={cx('information-wrapper')}>
                  <img
                    alt="product img"
                    src={imageServices.getImage(value.listImage[0])}
                    className={cx('product-img')}
                  />
                  <h2 className={cx('product-name')}>{value.name}</h2>
                  <div className={cx('product-description')}>{value.description}</div>
                  {/* <div className={cx('product-release-date')}>
                    <div className={cx('title')}>RELEASE DATE:</div>
                    <div className={cx('date')}>{new Date(value.createdDate).toLocaleDateString(undefined)}</div>
                  </div>
                  <div className={cx('product-development')}>
                    <div className={cx('title')}>DEVELOPER:</div>
                    <Link to="#" className={cx('link')}>
                      Rockstar North
                    </Link>
                  </div>
                  <div className={cx('product-publisher')}>
                    <div className={cx('title')}>PUBLISHER:</div>
                    <Link to="#" className={cx('link')}>
                      Rockstar Games
                    </Link>
                  </div> */}
                  <div className={cx('product-category')}>
                    <div className={cx('title')}>CATEGORY:</div>
                    <div className={cx('category-wrapper')}>
                      {value.genreName !== undefined &&
                        value.genreName.map((item, index) => {
                          return (
                            <Link
                              to={`/category/${value.genreIDs[index]}`}
                              className={cx('category-item')}
                              key={value.genreIDs[index]}
                            >
                              {item}
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isLoggedIn ? (
              <div className={cx('action-container')}>
                <div className={cx('wishlist-section')}>
                  {wishlistData.find((element) => element.gameID === value.gameID) === undefined ? (
                    loading2 ? (
                      <div className={cx('loading-2')}>
                        <span></span>
                      </div>
                    ) : (
                      <button className={cx('wishlish-button')} onClick={handleAddToWishlist}>
                        Add to your WishList
                      </button>
                    )
                  ) : (
                    <Link to={config.routes.wishlist} className={cx('view-wishlist-button')}>
                      View WishList
                    </Link>
                  )}
                </div>
                <div className={cx('cart-section')}>
                  {value.discount !== 0 && <span className={cx('origin-price')}>{currencyFormat(value.price)}</span>}
                  <span className={cx('discount-price')}>
                    {currencyFormat(value.price * (1 - value.discount / 100))}
                  </span>
                  {cartData.find((element) => element.gameId === value.gameID) === undefined ? (
                    loading ? (
                      <div className={cx('loading')}>
                        <span></span>
                      </div>
                    ) : (
                      <button className={cx('cart-button')} onClick={handleClick}>
                        Add to Cart
                      </button>
                    )
                  ) : (
                    <Link to={config.routes.cart} className={cx('view-cart-button')}>
                      View Cart
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className={cx('action-container')}></div>
            )}
          </>
        ) : (
          <>
            <div className={cx('not-found')}>
              <span>404 not found</span>
            </div>
          </>
        )}
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default ProductDetail;
