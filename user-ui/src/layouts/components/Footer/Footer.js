import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from 'src/config';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  const [copyRight, setCopyRight] = useState();
  useEffect(() => {
    const year = new Date().getFullYear();
    year === 2022 ? setCopyRight('Copyright © ' + year) : setCopyRight('Copyright © 2022 - ' + year);
  }, [copyRight]);

  return (
    <footer className={cx('wrapper')}>
      <div className={cx('container')}>
        {/* Noi dung */}
        <div className={cx('footer-content')}>
          <ul>
            <li>
              <Link to={config.routes.home}>Trang chủ</Link>
            </li>
            <li>
              <Link to={'#'}>Cộng đồng</Link>
            </li>
            <li>
              <Link to={config.routes.about}>Về chúng tôi</Link>
            </li>
            <li>
              <Link to={config.routes.contact}>Liên hệ</Link>
            </li>
          </ul>
        </div>
        <div className={cx('footer-content')}>
          <ul>
            <li>
              <p>Chúng tôi luôn cung cấp dịch vụ tốt nhất!</p>
            </li>
            <li>
              <br />
            </li>
            <li>
              <p>STEM isn't a Website, it's a Store.</p>
            </li>
            <li>
              <p>By Geniuses for Geniuses</p>
            </li>
          </ul>
        </div>
        <div className={cx('footer-content')}>
          <ul>
            <li>
              <p>Email: stem.store@gmail.com</p>
            </li>
            <li>
              <p>Phone/Fax: 18001050</p>
            </li>
            <li>
              <p>Mạng xã hội:</p>
            </li>
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} className={cx('icon')} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagramSquare} className={cx('icon')} />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitterSquare} className={cx('icon')} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={cx('footer-coppyright')}>
        {/* Noi dung */}
        {copyRight} Game Store. All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
