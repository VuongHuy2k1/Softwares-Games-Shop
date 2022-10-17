//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as imageServices from 'src/services/imageServices';
import { currencyFormat } from 'src/utils';

import styles from './CheckoutItem.module.scss';

const cx = classNames.bind(styles);
function CheckoutItem({ data }) {
  return (
    <>
      <div className={cx('checkout-item')}>
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
            {data.discount !== 0 && <span className={cx('origin-price')}>{currencyFormat(data.price)}</span>}
            <span className={cx('price')}>{currencyFormat(data.price * (1 - data.discount / 100))}</span>
          </div>
        </div>
      </div>
    </>
  );
}

//CheckoutItem.propTypes = {}

export default CheckoutItem;
