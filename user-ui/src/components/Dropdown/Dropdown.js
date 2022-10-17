import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Dropdown({ items, navbar = false, storenav = false, search = false, actionMenu = false }) {
  const classes = cx('wrapper', {
    navbar,
    storenav,
    actionMenu,
  });

  return (
    <div className={classes}>
      <ul className={cx('subnav')}>
        {items.map((item) => {
          return (
            <li key={item.id} className={cx('subnav-item')}>
              <Link to={item.path} onClick={item.action}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array,
  navbar: PropTypes.bool,
  storenav: PropTypes.bool,
  actionMenu: PropTypes.bool,
};
export default Dropdown;
