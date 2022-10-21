//import PropTypes from 'prop-types';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as imageServices from 'src/services/imageServices';
import { currencyFormat } from 'src/utils';

import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);
function ProductItem({ data }) {
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('detail')}>
          <h2 className={cx('name')}>
            <Link to={`/product/${data.gameID}`}>{data.name}</Link>
          </h2>
          <div className={cx('date')}>
            Release date: <strong>14/04/2015</strong>
          </div>
          <div className={cx('money')}>
            Origin Price: <strong>{currencyFormat(data.price)}</strong>
          </div>
          {data.discount > 0 && (
            <div className={cx('money')}>
              Discount: <strong>{data.discount}%</strong>
            </div>
          )}
        </div>
        <div className={cx('img')}>
          <img src={imageServices.getImage(data.listImage[0])} alt="Game" />
        </div>
        <div className={cx('action')}>
          <a
            href={process.env.PUBLIC_URL + '/images/game.jpg'}
            target="_blank"
            rel="noopener noreferrer"
            download={data.name}
          >
            <FontAwesomeIcon icon={faDownload} className={cx('icon')} />
          </a>
        </div>
      </div>
    </>
  );
}

//ProductItem.propTypes = {}

export default ProductItem;
