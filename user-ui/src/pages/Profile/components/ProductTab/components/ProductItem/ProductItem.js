//import PropTypes from 'prop-types';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import * as imageServices from 'src/services/imageServices';
import { currencyFormat } from 'src/utils';
import styles from './ProductItem.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);
function ProductItem({ data }) {
  const download = (e, urls, title) => {
    axios({ url: urls, method: 'GET', responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${title}.zip`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        alert(err);
      });
  };

  let date1 = new Date(data.createdDate).toLocaleDateString(undefined);
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('detail')}>
          <h2 className={cx('name')}>
            <Link to={`/product/${data.gameID}`}>{data.name}</Link>
          </h2>
          <div className={cx('money')}>
            Giá mua: <strong>{currencyFormat(data.price)}</strong>
          </div>

          {data.discount > 0 && (
            <div className={cx('money')}>
              Được giảm: <strong>{data.discount}%</strong>
            </div>
          )}
          <div className={cx('money')}>
            Ngày mua: <strong>{date1}</strong>
          </div>
        </div>
        <div className={cx('img')}>
          <img src={imageServices.getImage(data.listImage[0])} alt="Game" />
        </div>
        <div className={cx('action')}>
          <FontAwesomeIcon
            icon={faDownload}
            className={cx('icon')}
            onClick={(e) => download(e, imageServices.getImage(data.fileGame), data.name)}
          />
        </div>
      </div>
    </>
  );
}

//ProductItem.propTypes = {}

export default ProductItem;
