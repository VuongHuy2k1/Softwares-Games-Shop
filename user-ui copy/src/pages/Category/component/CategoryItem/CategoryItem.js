//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CategoryItem.module.scss';

const cx = classNames.bind(styles);
function CategoryItem({ data }) {
  return (
    <div className={cx('container')}>
      <Link to={`/category/${data.id}`} className={cx('link')}>
        {data.name}
      </Link>
    </div>
  );
}

//CategoryItem.propTypes = {}

export default CategoryItem;
