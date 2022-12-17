// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import SliderButton from './SliderButton';
import { Link } from 'react-router-dom';
import { currencyFormat } from 'src/utils';
import * as productServices from 'src/services/productServices';
import * as imageServices from 'src/services/imageServices';

import styles from './Sell.module.scss';
const cx = classNames.bind(styles);
export default function Sell() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideValue, setSlideValue] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getSalesProduct(1);
      setSlideValue(result.items);
    };
    fetchApi();
  }, []);

  const nextSlide = () => {
    if (slideIndex !== sliceSlideValue.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === sliceSlideValue.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(sliceSlideValue.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    console.log(slideValue);
    for (index = 0; index < arrayLength; index += chunk_size) {
      var myChunk = myArray.slice(index, index + chunk_size);
      if (myChunk.length === 5 || myChunk.length === 4) {
        tempArray.push(myChunk);
      }
    }

    return tempArray;
  };
  const [sliceSlideValue, setSilceSlideValue] = useState([]);

  useEffect(() => {
    var sliceValue = chunkArray(slideValue, 5);
    setSilceSlideValue(sliceValue);
  }, [slideValue]);

  return (
    <div className={cx('container')}>
      <div className={cx('container-content')}>
        <h1>Khuyến mãi</h1>
        <Link to={`/products/q=specials`}>
          <h4>Xem thêm</h4>
        </Link>
      </div>

      <div className={cx('container-slider')}>
        {sliceSlideValue.map((items, index) => {
          if (items?.length === 5) {
            return (
              <div className={slideIndex === index + 1 ? cx('slide') : cx('active-anim')} key={index}>
                {items?.map((item, index) => {
                  return (
                    <div className={cx('product')}>
                      <div className={cx('product-img')}>
                        <Link to={'#'}>
                          <img src={imageServices.getImage(item.listImage[0])} alt=""></img>
                        </Link>
                        <div className={cx('img-hover')}>
                          <img src={imageServices.getImage(item.listImage[1])} alt=""></img>
                        </div>
                      </div>

                      <div className={cx('product-detai')}>
                        <div className={cx('detail-wrapper')}>
                          <Link to={`/product/${item.gameID}`} className={cx('detail-link')}>
                            <div className={cx('detail-content')}>
                              <div className={cx('title')}>{item.name}</div>
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
                                {item.discount > 0 && <div className={cx('discount')}>-{item.discount}%</div>}
                                <div className={cx('prices')}>
                                  {item.discount > 0 && (
                                    <div className={cx('discount-orginal-price')}>{currencyFormat(item.price)}</div>
                                  )}
                                  <div className={cx('discount-final-price')}>
                                    {currencyFormat(item.price * (1 - item.discount / 100))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}

        <SliderButton moveSlide={nextSlide} direction={'next'} />
        <SliderButton moveSlide={prevSlide} direction={'prev'} />
      </div>
      <div className={cx('container-dots')}>
        {Array.from({ length: sliceSlideValue.length }).map((item, index) => (
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
