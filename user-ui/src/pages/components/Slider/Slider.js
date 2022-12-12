// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import SliderButton from './SliderButton';
import { Link } from 'react-router-dom';
import { currencyFormat } from 'src/utils';
import * as productServices from 'src/services/productServices';
import * as imageServices from 'src/services/imageServices';

import styles from './Slider.module.scss';
const cx = classNames.bind(styles);
export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideValue, setSlideValue] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getLatestProduct(1, 10);
      setSlideValue(result.items);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const timerId = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(timerId);
    };
  });

  const nextSlide = () => {
    if (slideIndex !== slideValue.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === slideValue.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(slideValue.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className={cx('warpper')}>
      <div className={cx('container-slider')}>
        {slideValue.map((item, index) => {
          return (
            <div className={slideIndex === index + 1 ? cx('slide', 'active-anim') : cx('slide')} key={item.gameID}>
              <div className={cx('img')}>
                <div className={cx('img-slide')}>
                  <Link to={`/product/${item.gameID}`}>
                    <img src={imageServices.getImage(item.listImage[0])} alt=""></img>
                  </Link>
                </div>

                <div className={cx('detail-wrapper')}>
                  <Link to={`/product/${item.gameID}`} className={cx('detail-link')}>
                    <div className={cx('detail-content')}>
                      <div className={cx('title')}>{item.name}</div>

                      <div className={cx('screen')}>
                        {item.listImage?.map((img, index) => {
                          if (index < 5 && index > 0) {
                            return (
                              <div className={cx('screen-img')}>
                                <img src={imageServices.getImage(img)} key={index} alt="" />
                              </div>
                            );
                          } else return null;
                        })}
                      </div>
                      <div className={cx('category-items')}>
                        {item.genreName.map((category, index) => {
                          return (
                            <div key={index} className={cx('category-item')}>
                              {category}
                            </div>
                          );
                        })}
                      </div>
                      <div className={cx('discount-prices')}>
                        {item.discount > 0 && (
                          <div className={cx('discount-orginal-price')}>{currencyFormat(item.price)}</div>
                        )}
                        <div className={cx('discount-final-price')}>
                          {currencyFormat(item.price * (1 - item.discount / 100))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        <SliderButton moveSlide={nextSlide} direction={'next'} />
        <SliderButton moveSlide={prevSlide} direction={'prev'} />
      </div>
      <div className={cx('container-dots')}>
        {Array.from({ length: slideValue.length }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? cx('dot', 'active') : cx('dot')}
          ></div>
        ))}
      </div>
    </div>
  );
}
