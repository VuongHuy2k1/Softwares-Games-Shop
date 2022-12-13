//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ProductItem from '../ProductItem/ProductItem';

import styles from './ProductItems.module.scss';

const cx = classNames.bind(styles);
function ProductItems({ data }) {
  return (
    <>
      <div className={cx('container')}>
        {data.map((item, index) => {
          return <ProductItem data={item} key={item.gameID} />;
        })}
      </div>
    </>
  );
}

//ProductItems.propTypes = {}

export default ProductItems;
