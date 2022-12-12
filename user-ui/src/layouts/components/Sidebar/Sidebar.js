import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import styles from './Sidebar.module.scss';
import * as categoryServices from 'src/services/categoryServices';

const cx = classNames.bind(styles);

function Sidebar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategories();
      setCategories(result || []);
    };

    fetchApi();
  }, []);

  return (
    <aside className={cx('wrapper')}>
      {/* <div className={cx('container')}>
        <span>DISCOVERY QUEUES</span>
        <Link to={config.routes.home}>Recommendations</Link>
        <Link to={config.routes.home}>New Releases</Link>
      </div> */}
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
    </aside>
  );
}

export default Sidebar;
