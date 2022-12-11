//import PropTypes from 'prop-types';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import ProductItems from './components/ProductItems';
import { useEffect, useLayoutEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCheckout, checkoutSelector } from 'src/store/reducers/checkoutSlice';
import styles from './ProductTab.module.scss';
const cx = classNames.bind(styles);
function ProductTab() {
  const dispatch = useDispatch();
  const checkout = useSelector(checkoutSelector);
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    dispatch(getCheckout());
  }, [dispatch]);

  useLayoutEffect(() => {
    setCheckoutData(checkout.data || []);
  }, [checkout]);
  console.log('value', checkoutData);
  return (
    <>
      <div className={cx('wrapper')}>
        <>
          <h2 className={cx('title')}>
            <FontAwesomeIcon icon={faGamepad} className={cx('icon')} />
            Sản phẩm đã mua ({checkoutData.length})
          </h2>
          <div className={cx('container')}>
            <ProductItems data={checkoutData} />
          </div>
        </>
      </div>
    </>
  );
}

export default ProductTab;
