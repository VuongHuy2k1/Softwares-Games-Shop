// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import SliderButton from '../Slider/SliderButton';
import { Link } from 'react-router-dom';

import * as categoryServices from 'src/services/categoryServices';

import styles from './BrowseGen.module.scss';
const cx = classNames.bind(styles);
export default function BrowseByGen() {
  var Value = [
    { name: 'Best Seller', link: `/products/q=best-seller` },
    { name: 'New Releases', link: `/products/q=latest` },
    { name: 'Specials', link: `/products/q=specials` },
    { name: 'All Products', link: `/products` },
  ];
  return (
    <div className={cx('container')}>
      <div className={cx('container-content')}>
        <h1>Duyệt Stem</h1>
      </div>

      <div className={cx('container-slider')}>
        {Value.map((items, index) => {
          return (
            <div className={cx('slide')} key={index}>
              <Link to={items.link} className={cx('detail-link')}>
                <div className={cx('product')}>{items.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
