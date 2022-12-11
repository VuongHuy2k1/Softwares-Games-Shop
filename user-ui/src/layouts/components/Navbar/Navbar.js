import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';

import * as categoryServices from '~/services/categoryServices';
const cx = classNames.bind(styles);

function Navbar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategories();
      setCategories(result || []);
    };

    fetchApi();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <span>DUYỆT THEO TAG</span>
        <Link to={`/products/q=best-seller`}>Bán Chạy</Link>
        <Link to={`/products/q=latest`}>Mới Nhất</Link>
        <Link to={`/products/q=specials`}>Khuyến Mãi</Link>
        <Link to={`/products`}>Tất cả sản phẩm</Link>
      </div>
      <div className={cx('container')}>
        <span>DUYỆT THEO THỂ LOẠI</span>
        {categories.map((item) => {
          return (
            <Link to={`/category/${item.id}`} key={item.id}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
