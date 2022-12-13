import classNames from 'classnames/bind';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import * as imageServices from 'src/services/imageServices';

import styles from './ProductGallery.module.scss';

const cx = classNames.bind(styles);

function ProductGallery({ data }) {
  const Images = [
    imageServices.getImage(data[1]),
    imageServices.getImage(data[2]),
    imageServices.getImage(data[3]),
    imageServices.getImage(data[4]),
  ];

  const [imgIndex, setImgIndex] = useState(0);
  //   gắn giá trị khởi tạo là bức hình đầu tiên
  const [screenPath, setscreenPath] = useState(Images[0]);
  useLayoutEffect(() => {
    const timerId = setInterval(nextSlide, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

  const nextSlide = () => {
    if (imgIndex !== Images.length - 1) {
      setImgIndex(imgIndex + 1);
      setscreenPath(Images[imgIndex + 1]);
    } else if (imgIndex === Images.length - 1) {
      setImgIndex(0);
      setscreenPath(Images[0]);
    }
  };
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('screen')}>
          <img src={screenPath} alt="" className={cx('screen-img')} />
        </div>
        <div className={cx('gallery-items')}>
          {Images.map((image, index) => {
            return (
              <div className={cx('gallery-item')} key={index}>
                <img
                  src={image}
                  alt=""
                  className={imgIndex === index ? cx('gallery-item', 'focus') : cx('gallery-item')}
                  onClick={() => {
                    setImgIndex(index);
                    setscreenPath(image);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductGallery;
