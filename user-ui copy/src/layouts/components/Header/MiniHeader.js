import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faNavicon, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames/bind';
import config from '../../../config/index.js';
import images from '../../../assets/images/index.js';
import Button from '../../../components/Button/Button.js';
import styles from './Header.module.scss';
import { navItems } from './NavItems.js';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Navbar from '../Navbar';
import React from 'react';
import DrawerM from '../Drawer/index.js';
import DrawerRight from '../DrawerRight/index.js';
const cx = classNames.bind(styles);

function MiniHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const toggleDrawerRight = (e) => {
    setIsOpenRight((prevState) => !prevState);
  };
  return (
    <header className={cx('nar-bar')}>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className={cx('drawer')}
        styles={{ backgroutColor: 'black' }}
      >
        <DrawerM />
      </Drawer>
      <div className={cx('nar-bar-container')} onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faNavicon} className={cx('iconNav')} />
      </div>
      <div className={cx('header-logo')}>
        <Link to={config.routes.home}>
          <img src={images.logo} alt="Gaming store" />
        </Link>
      </div>
      <div className={cx('nar-bar-container-right')} onClick={toggleDrawerRight}>
        <FontAwesomeIcon icon={faUser} className={cx('iconUser')} />
      </div>
      <Drawer
        open={isOpenRight}
        onClose={(e) => toggleDrawerRight(e)}
        direction="right"
        className={cx('drawer')}
        styles={{ backgroutColor: 'black' }}
      >
        <DrawerRight />
      </Drawer>
    </header>
  );
}

export default MiniHeader;
