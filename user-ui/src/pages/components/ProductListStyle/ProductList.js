// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import config from 'src/config';
import ProductItemStyle from './ProductItem';

import * as productServices from 'src/services/productServices';
// import { TbArrowBigLeftLines } from 'react-icons/tb';
import styles from './ProductListStyle.module.scss';
const cx = classNames.bind(styles);
function ProductListStyle({ pagination = false, typePage = '', type = '', title = 'List Product', link = '' }) {
  const navigate = useNavigate();

  const { genre, keyword, page } = useParams();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewValue, setReviewValue] = useState({});
  const [value, setValue] = useState([]);
  const [sliceValue, setSilceValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(1000);

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoaded(true);
      var result;
      switch (typePage) {
        case 'search': {
          result = await productServices.getProductsByKeyword(keyword, page || 1, 10);
          break;
        }
        case 'category': {
          result = await productServices.getProductsByGenreId(genre, page || 1, 10);
          break;
        }
        case 'products': {
          switch (keyword) {
            case 'latest': {
              result = await productServices.getLatestProduct(page || 1, 10);
              break;
            }
            case 'best-seller': {
              result = await productServices.getBestSellerProduct(page || 1, 10);
              break;
            }
            case 'specials': {
              result = await productServices.getSalesProduct(page || 1, 10);
              break;
            }
            default: {
              result = await productServices.getAllProduct(page || 1, 10);
              break;
            }
          }
          break;
        }
        default: {
          switch (type) {
            case 'latest': {
              result = await productServices.getLatestProduct(page || 1, 10);
              break;
            }
            case 'best-seller': {
              result = await productServices.getBestSellerProduct(page || 1, 10);
              break;
            }
            case 'specials': {
              result = await productServices.getSalesProduct(page || 1, 10);
              break;
            }
            default: {
              result = await productServices.getAllProduct(page || 1, 10);
              break;
            }
          }
          break;
        }
      }
      setValue(result.items);
      setReviewValue(result.items[0]);
      setReviewIndex(0);
      setTotalPages(result.pageCount);
    };

    fetchApi();
  }, [genre, keyword, page, typePage, type]);

  var _page = parseInt(page || 1);
  const handleClickPrev = () => {
    if (page === undefined || page === 'undefined') {
      return;
    } else {
      const query = genre || `q=${keyword || 'all'}`;
      navigate(`/${typePage}/${query}/page=${_page - 1}`);
    }
  };

  const handleClickNext = () => {
    if (page === undefined || page === 'undefined') {
      _page = 1;
    }
    const _nextPage = _page + 1;
    const query = genre || `q=${keyword || 'all'}`;
    navigate(`/${typePage}/${query}/page=${_nextPage.toString()}`);
  };

  useEffect(() => {
    if (_page < 1 || _page > totalPages) {
      navigate(config.routes.notFound, { replace: true });
    }
  }, [_page, navigate, totalPages]);
  const chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      var myChunk = myArray.slice(index, index + chunk_size);
      if (myChunk.length === 4) {
        tempArray.push(myChunk);
      }
    }

    return tempArray;
  };

  useEffect(() => {
    var newSliceValue = chunkArray(value, 4);
    setSilceValue(newSliceValue);
  }, [value]);

  return (
    <div className={cx('container')}>
      <div className={cx('container-content')}>
        <h1>{title}</h1>
        <div>
          <Link to={link}>
            <h4>Xem thêm</h4>
          </Link>
        </div>
      </div>
      <div className={cx('container-slider')}>
        {sliceValue.length > 0 && isLoaded ? (
          <>
            {sliceValue.map((items, index) => {
              return (
                <div className={cx('content')} key={index}>
                  <div className={cx('slide')}>
                    {items.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onMouseEnter={() => {
                            setReviewIndex(index);
                            setReviewValue(value[index]);
                          }}
                        >
                          <ProductItemStyle
                            data={item}
                            isActive={index === reviewIndex}
                            isShow={index === reviewIndex}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          isLoaded && (
            <div className={cx('not-found')}>
              <h2>no result(s) found</h2>
              <span className={cx('loading')}></span>
            </div>
          )
        )}
      </div>
      <div className={cx('footer')}>
        {totalPages > 1 && pagination && (
          <>
            <button className={cx('prev-button')} onClick={handleClickPrev} disabled={_page <= 1}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button className={cx('next-button')} onClick={handleClickNext} disabled={_page === totalPages}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ProductList.propTypes = {};

export default ProductListStyle;
