//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useNotification } from 'src/hooks';
import { getCart } from 'src/store/reducers/cartSlice';
import * as cartServices from 'src/services/cartServices';
import * as imageServices from 'src/services/imageServices';
import ToastPortal from 'src/components/ToastPortal';

import styles from './CartItem.module.scss';
import { currencyFormat } from 'src/utils';
const cx = classNames.bind(styles);
function CartItem({ data }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const removeItem = async () => {
    setLoading(true);
    const response = await cartServices.removeCart({ gameId: data.gameId });
    if (response.isSuccess === true) {
      Notify('success', 'Xóa thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        dispatch(getCart());
      }, 2000);
    }
    if (response.isSuccess === false) {
      Notify('error', 'Có gì đó sai sai');
      setLoading(false);
    }
  };

  const handleClick = () => {
    removeItem();
  };

  return (
    <>
      <div className={cx('cart-item')}>
        <Link to={`/product/${data.gameId}`} className={cx('img')}>
          <img src={imageServices.getImage(data.imageList[0])} alt="" />
        </Link>
        <div className={cx('item-detail')}>
          <div className={cx('item-name')}>
            <h2 className={cx('name')}>
              <Link to={`/product/${data.gameId}`}>{data.name}</Link>
            </h2>
          </div>
          <div className={cx('item-price')}>
            <span className={cx('price')}>{currencyFormat(data.price)}</span>
            <span className={cx('remove')} onClick={handleClick}>
              {loading ? '' : 'Gỡ'}
            </span>
          </div>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

//CartItem.propTypes = {}

export default CartItem;
