// import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import * as imageServices from 'src/services/imageServices';

const cx = classNames.bind(styles);

function SearchResultItem({ data }) {
  return (
    <div className={cx('result')}>
      <a href={`/product/${data.gameID}`} className={cx('game-wrapper')}>
        <img className={cx('game-img')} alt={data.name} src={imageServices.getImage(data.listImage[0])} />
        <div className={cx('game-detail')}>
          <p>{data.name}</p>
          <p>{data.price * (1 - data.discount / 100)}</p>
        </div>
      </a>
    </div>
  );
}

export default SearchResultItem;
