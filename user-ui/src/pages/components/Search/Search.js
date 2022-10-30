import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import SearchResults from './SearchResults';
import { useClickOutside, useDebounce } from 'src/hooks';
import * as productServices from 'src/services/productServices';
const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const searchRef = useRef();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleShow = () => {
    setShowResult(true);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  useClickOutside(searchRef, handleHideResult);
  const handleClick = () => {
    setShowResult(false);
    setSearchValue('');
  };
  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      if (debouncedValue !== '') {
        const result = await productServices.search(debouncedValue);

        setSearchResult(result.items);
        setTotalRecords(result.totalRecords);
        setShowResult(true);
      }
    };

    fetchApi();
  }, [debouncedValue]);

  return (
    <div className={cx('search')} ref={searchRef}>
      <div className={cx('search-box')}>
        <input
          className={cx('search-input')}
          type="text"
          placeholder="Search . . ."
          value={searchValue}
          onChange={handleSearch}
          onFocus={handleShow}
        />
        <Link
          type="button"
          className={cx('search-button')}
          to={searchValue === '' ? '#' : `/search/q=${searchValue}`}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
      {showResult && searchResult.length > 0 && <SearchResults data={searchResult} totalRecords={totalRecords} />}
    </div>
  );
}

export default Search;
