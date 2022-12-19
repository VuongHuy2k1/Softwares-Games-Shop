// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as categoryServices from 'src/services/categoryServices';
import config from '~/config';
import ProductItem from './ProductItem';
import ProductReview from './ProductReview';
import * as productServices from '~/services/productServices';

import styles from './ProductList.module.scss';
const cx = classNames.bind(styles);
function ProductListII({ pagination = false, typePage = '', type = '', title = 'List Product' }) {
  const navigate = useNavigate();
  const { genre, keyword, page } = useParams();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewValue, setReviewValue] = useState({});
  const [value, setValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(1000);
  const [valueCate, setValueCate] = useState([]);
  const [valueCheck, setValueCheck] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoaded(true);
      var result;
      switch (typePage) {
        case 'search': {
          result = await productServices.getProductsByKeyword(keyword, page || 1);
          break;
        }
        case 'category': {
          result = await productServices.getProductsByGenreId(genre, page || 1);
          break;
        }
        case 'products': {
          switch (keyword) {
            case 'latest': {
              result = await productServices.getLatestProduct(page || 1);
              break;
            }
            case 'best-seller': {
              result = await productServices.getBestSellerProduct(page || 1);
              break;
            }
            case 'specials': {
              result = await productServices.getSalesProduct(page || 1);
              break;
            }
            default: {
              result = await productServices.getAllProduct(page || 1);
              break;
            }
          }
          break;
        }
        default: {
          switch (type) {
            case 'latest': {
              result = await productServices.getLatestProduct(page || 1);
              break;
            }
            case 'best-seller': {
              result = await productServices.getBestSellerProduct(page || 1);
              break;
            }
            case 'specials': {
              result = await productServices.getSalesProduct(page || 1);
              break;
            }
            default: {
              result = await productServices.getAllProduct(page || 1);
              break;
            }
          }
          break;
        }
      }

      if (valueCheck.length <= 0) {
        setValue(result.items);
        setReviewValue(result.items[0]);
        setTotalPages(result.pageCount);
      } else {
        function fillT(array, size) {
          let result = [];
          let count = 0;
          for (let i = 0; i < size - 1; ++i) {
            for (let j = i + 1; j < size; ++j) {
              if (array[i] == array[j]) {
                result[count] = array[i];
                ++count;
              }
            }
          }
          return result;
        }
        function fill(array) {
          let result = [];
          array.map((i) => {
            i.genreName.map((j) => {
              valueCheck.map((k) => {
                if (j === k) {
                  result = [...result, i];
                }
              });
            });
          });
          return result;
        }

        if (valueCheck.length > 1) {
          setValue(fillT(fill(result.items), fill(result.items).length));
          setReviewValue(fillT(fill(result.items), fill(result.items).length)[0]);
          setTotalPages(result.pageCount);
        } else {
          setValue(fill(result.items));
          setReviewValue(fill(result.items)[0]);
          setTotalPages(result.pageCount);
        }
      }
    };

    fetchApi();
  }, [genre, keyword, page, typePage, type, valueCheck]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategories();
      setValueCate(result);
    };
    fetchApi();
  }, []);

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

  const checkHandel = (id, item) => {
    var checkBox = document.getElementById(id);

    if (checkBox.checked === true) {
      setValueCheck([...valueCheck, item]);
    } else {
      setValueCheck(valueCheck.filter((e) => e !== item));
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper-fills')}>
        <div className={cx('wrapper-fill')}>
          <div className={cx('fill-content')}>
            <p>Thể loại</p>
          </div>
          <div className={cx('fill-container')}>
            {valueCate?.map((value, index) => {
              return (
                <div className={cx('fill-label')}>
                  <input
                    type="checkbox"
                    id={value.id}
                    name={value.name}
                    value={value.name}
                    onClick={(e) => checkHandel(value.id, value.name)}
                  ></input>
                  <label for="vehicle1" className={cx('fill-name')}>
                    {value?.name}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={cx('wrapper-list')}>
        <div className={cx('header')}>
          <h2>{title}</h2>
        </div>
        <div className={cx('container')}>
          {value.length > 0 && isLoaded ? (
            <>
              <div className={cx('content')}>
                {value.map((item, index) => {
                  return (
                    <div key={index}>
                      <ProductItem data={item} isActive={index === reviewIndex} />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            isLoaded && (
              <div className={cx('not-found')}>
                <h2>Không có sản phẩm phù hợp</h2>
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
    </div>
  );
}

// ProductList.propTypes = {};

export default ProductListII;
