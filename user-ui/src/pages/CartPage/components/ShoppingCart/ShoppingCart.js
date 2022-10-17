//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCart, cartSelector } from 'src/store/reducers/cartSlice';
import CartItem from '../CartItem';
import Button from 'src/components/Button';
import config from 'src/config';
import { currencyFormat } from 'src/utils';

import styles from './ShoppingCart.module.scss';
const cx = classNames.bind(styles);
function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>Your Shopping Cart</h2>
        <div className={cx('content')}>
          <div className={cx('cart-container')}>
            {cartData.length > 0 ? (
              cartData.map((item, index) => {
                return <CartItem data={item} key={item.gameId} />;
              })
            ) : (
              <div className={cx('empty-cart')}>
                <h2>Empty Cart</h2>
                <Button to={config.routes.home} className={cx('shopping-button')}>
                  Back to Store
                </Button>
              </div>
            )}
          </div>
          <div className={cx('cart-total-container')}>
            <div className={cx('total-price')}>
              {`Total: ${currencyFormat(cartData.reduce((total, current) => total + current.price, 0))}`}
            </div>
            <div className={cx('discount')}>
              {`Discount:
              ${currencyFormat(
                cartData.reduce((total, current) => total + (current.price * current.discount) / 100, 0),
              )}`}
            </div>
            <hr />
            <div className={cx('final-price')}>
              {`Estimated total: 
              ${currencyFormat(
                cartData.reduce((total, current) => total + current.price * (1 - current.discount / 100), 0),
              )}`}
            </div>
            <div className={cx('action')}>
              <Button to={config.routes.home} className={cx('shopping-button')}>
                Continue Shopping
              </Button>
              {cartData.length > 0 && (
                <Button to={config.routes.checkout} className={cx('checkout-button')}>
                  Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//ShoppingCart.propTypes = {}

export default ShoppingCart;
