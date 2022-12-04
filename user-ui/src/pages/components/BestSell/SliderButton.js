import classNames from 'classnames/bind';

import styles from './Sell.module.scss';
import images from 'src/assets/images';

const cx = classNames.bind(styles);

export default function SliderButton({ direction, moveSlide }) {
  return (
    <button onClick={moveSlide} className={direction === 'next' ? cx('btn-slide', 'next') : cx('btn-slide', 'prev')}>
      <img src={direction === 'next' ? images.rightArrow : images.leftArrow} alt="" />
    </button>
  );
}
