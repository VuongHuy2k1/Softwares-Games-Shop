import classNames from 'classnames/bind';

import SearchResultItem from './SearchResultItem';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function SearchResults({ data, totalRecords }) {
  return (
    <div className={cx('search-results')}>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <p>Results: {totalRecords} Game(s) has found</p>
        </div>
        <div className={cx('container')}>
          {data.map((item) => {
            return <SearchResultItem key={item.gameID} data={item} />;
          })}
        </div>
        <div className={cx('footer')}></div>
      </div>
    </div>
  );
}

export default SearchResults;
