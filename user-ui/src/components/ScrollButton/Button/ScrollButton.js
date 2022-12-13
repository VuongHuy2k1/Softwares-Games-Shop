import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Styles.module.scss';
const cx = classNames.bind(styles);

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
		in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <button className={visible ? cx('button', 'inline') : cx('button', 'none')}>
      <FontAwesomeIcon icon={faChevronCircleUp} onClick={scrollToTop} />
    </button>
  );
};

export default ScrollButton;
