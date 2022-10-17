//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ToastPortal from 'src/components/ToastPortal';
import Button from 'src/components/Button';
import PaymentItem from '../CheckoutItem';
import config from 'src/config';
import * as checkoutServices from 'src/services/checkoutServices';
import { getCart, cartSelector } from 'src/store/reducers/cartSlice';
import { useNotification } from 'src/hooks';
import { currencyFormat } from 'src/utils';

import styles from './Payment.module.scss';
const cx = classNames.bind(styles);
function Payment() {
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    const response = await checkoutServices.checkout();
    console.log(response);

    if (response.isSuccess === true) {
      Notify('success', 'Checkout Successfully');
      const timerId = setTimeout(() => {
        navigate(config.routes.profile);
        clearTimeout(timerId);
      }, 2000);
    }

    if (response.isSuccess === false) {
      Notify('error', 'Checkout Fail');
      setLoading(false);
    }
  };

  const handlePurchaseClick = async () => {
    checkout();
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

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
        <h2 className={cx('title')}>Checkout</h2>
        <div className={cx('content')}>
          <div className={cx('payment-container')}>
            {cartData.length < 0 ? (
              <></>
            ) : (
              cartData.map((item) => {
                return <PaymentItem data={item} key={item.gameId} />;
              })
            )}
          </div>
          <div className={cx('payment-total-container')}>
            <div className={cx('total-price')}>
              {`Total price: ${currencyFormat(cartData.reduce((total, current) => total + current.price, 0))}`}
            </div>
            <div className={cx('discount')}>
              {`Total discount: - 
              ${currencyFormat(
                cartData.reduce((total, current) => total + (current.price * current.discount) / 100, 0),
              )}`}
            </div>
            <div className={cx('vat')}>{`VAT: + ${currencyFormat(0)}`}</div>
            <hr />
            <div className={cx('final-price')}>
              {`Amount: ${currencyFormat(
                cartData.reduce((total, current) => total + current.price * (1 - current.discount / 100), 0),
              )}`}
            </div>
            <div className={cx('discount')}>
              {`Saved: 
              ${currencyFormat(
                cartData.reduce((total, current) => total + (current.price * current.discount) / 100, 0),
              )}`}
            </div>
            <div className={cx('action')}>
              <Button className={cx('cancel-button')} onClick={handleCancelClick} disabled={loading}>
                Cancel
              </Button>
              {loading ? (
                <div className={cx('loading')}>
                  <span></span>
                </div>
              ) : (
                <Button className={cx('checkout-button')} onClick={handlePurchaseClick}>
                  Purchase
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

//Payment.propTypes = {}

export default Payment;
