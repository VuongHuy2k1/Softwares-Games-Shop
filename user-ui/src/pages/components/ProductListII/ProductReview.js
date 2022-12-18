import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import * as imageServices from '~/services/imageServices';

import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);
function ProductReview({ data }) {
  const Images = [
    imageServices.getImage(data.listImage[1]),
    imageServices.getImage(data.listImage[2]),
    imageServices.getImage(data.listImage[3]),
    imageServices.getImage(data.listImage[4]),
  ];
  return (
    <div className={cx('review-container')}>
      <div className={cx('review-title')}>{data.name}</div>
      <div className={cx('category-items')}>
        {data.genreName.map((category, index) => {
          return (
            <Link to={`/category/${data.genreIDs[index]}`} key={data.genreIDs[index]} className={cx('category-item')}>
              {category}
            </Link>
          );
        })}
      </div>
      <div className={cx('review-gallery')}>
        <img className={cx('review-img')} alt="Game" src={Images[0]} />
        <img className={cx('review-img')} alt="Game" src={Images[1]} />
        <img className={cx('review-img')} alt="Game" src={Images[2]} />
        <img className={cx('review-img')} alt="Game" src={Images[3]} />
      </div>
    </div>
  );
}
ProductReview.prototype = {
  data: PropTypes.object,
};
export default ProductReview;
