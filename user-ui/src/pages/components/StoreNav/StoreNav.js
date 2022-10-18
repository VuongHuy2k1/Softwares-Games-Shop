// import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './StoreNav.module.scss';
import Search from 'src/pages/components/Search';
import Dropdown from 'src/components/Dropdown';
import { storeNavItems } from './StoreNavItems.js';

const cx = classNames.bind(styles);

function StoreNav() {
  const [storeDropdown, setStoreDropdown] = useState(false);
  const [lastestDropdown, setLastestDropdown] = useState(false);

  const renderStoreNavItem = storeNavItems.map((item) => {
    switch (item.title) {
      case 'Your Store':
        return (
          <li
            className={cx('store-nav-item')}
            key={item.id}
            onMouseEnter={() => setStoreDropdown(true)}
            onMouseLeave={() => setStoreDropdown(false)}
          >
            <Link to={item.path}>{item.title}</Link>
            {storeDropdown && <Dropdown items={item.subnav} storenav />}
          </li>
        );
      case 'New & Noteworthy':
        return (
          <li
            className={cx('store-nav-item')}
            key={item.id}
            onMouseEnter={() => setLastestDropdown(true)}
            onMouseLeave={() => setLastestDropdown(false)}
          >
            <Link to={item.path}>{item.title}</Link>
            {lastestDropdown && <Dropdown items={item.subnav} storenav />}
          </li>
        );
      default:
        return (
          <li className={cx('store-nav-item')} key={item.id}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        );
    }
  });

  return (
    <div className={cx('wrapper')}>
      <ul className={cx('store-nav')}>{renderStoreNavItem}</ul>

      <div className={cx('search-section')}>
        <Search></Search>
      </div>
    </div>
  );
}

export default StoreNav;
