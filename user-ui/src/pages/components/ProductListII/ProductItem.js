import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import * as imageServices from 'src/services/imageServices';
import { currencyFormat } from 'src/utils';
// import config from 'src/config';

import styles from './ProductList.module.scss';
const cx = classNames.bind(styles);

function ProductItemStyle({ data, isActive, isShow }) {
  return (
    <>
      <div className={cx('product')}>
        <div className={cx('product-img')}>
          <Link to={`/product/${data.gameID}`}>
            <img src={imageServices.getImage(data.listImage[0])} alt=""></img>
          </Link>
          {/* <div className={cx('img-hover')}>
            <img src={imageServices.getImage(data.listImage[1])} alt=""></img>
          </div> */}
        </div>

        <div className={cx('product-detai')}>
          <div className={cx('detail-wrapper')}>
            <Link to={`/product/${data.gameID}`} className={cx('detail-link')}>
              <div className={cx('detail-content')}>
                <div className={cx('title')}>{data.name}</div>
                <div className={cx('category-datas')}>
                  {data.genreName.slice(0, 2).map((category, index) => {
                    return (
                      <div key={index} className={cx('category-data')}>
                        {category}
                      </div>
                    );
                  })}
                </div>
                {data.discount > 0 ? (
                  <>
                    <div className={cx('discount-prices')}>
                      {data.discount > 0 && <div className={cx('discount')}>-{data.discount}%</div>}
                      <div className={cx('prices')}>
                        {data.discount > 0 && (
                          <div className={cx('discount-orginal-price')}>{currencyFormat(data.price)}</div>
                        )}
                        <div className={cx('discount-final-price')}>
                          {currencyFormat(data.price * (1 - data.discount / 100))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={cx('discount-prices')}>
                      {data.discount > 0 && <div className={cx('discount')}>-{data.discount}%</div>}
                      <div className={cx('prices')}>
                        <div className={cx('final-price')}>
                          {currencyFormat(data.price * (1 - data.discount / 100))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

ProductItemStyle.prototype = {
  isActive: PropTypes.bool,
  data: PropTypes.object,
};
export default ProductItemStyle;
