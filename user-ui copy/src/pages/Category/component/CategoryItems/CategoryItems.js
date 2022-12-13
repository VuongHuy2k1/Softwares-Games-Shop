//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import CategoryItem from '../CategoryItem/CategoryItem';

import styles from './CategoryItems.module.scss';

const cx = classNames.bind(styles);
function CategoryItems({ data }) {
  return (
    <>
      <div className={cx('wrapper')}>
        {data.map((item) => {
          return <CategoryItem data={item} key={item.id} />;
        })}
      </div>
    </>
  );
}

//CategoryItems.propTypes = {}

export default CategoryItems;
