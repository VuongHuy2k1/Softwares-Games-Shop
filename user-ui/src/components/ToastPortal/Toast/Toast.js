import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ mode, onClose, message }) {
  switch (mode) {
    case 'success':
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'success')}>
            <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
    case 'error':
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'error')}>
            <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
    case 'warning':
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'warning')}>
            <FontAwesomeIcon icon={faCircleExclamation} className={cx('icon')} />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
    default:
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'success')}>
            <FontAwesomeIcon icon={faCircleCheck} className={cx('icon')} />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
  }
}

export default Toast;
