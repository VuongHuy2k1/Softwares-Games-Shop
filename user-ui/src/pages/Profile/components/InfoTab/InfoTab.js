//import PropTypes from 'prop-types';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'src/store/reducers/userSlice';

import styles from './InfoTab.module.scss';

const cx = classNames.bind(styles);
function InfoTab() {
  const userInfo = useSelector(userSelector);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
  });

  useEffect(() => {
    if (userInfo.data !== undefined) {
      setUserData(userInfo.data);
    }
  }, [userInfo]);
  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>
          <FontAwesomeIcon icon={faUser} className={cx('icon')} />
          about me
        </h2>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <h2 className={cx('title')}>Personal Infomation</h2>
            <>
              <div className={cx('line')}>
                <div className={cx('label')}>Username:</div>
                <div className={cx('text')}>{userData.userName}</div>
              </div>
              <div className={cx('line')}>
                <div className={cx('label')}>Fullname:</div>
                <div className={cx('text')}>{`${userData.lastName || ''} ${userData.firstName || ''}`}</div>
              </div>
              <div className={cx('line')}>
                <div className={cx('label')}>Date of Birth:</div>
                <div className={cx('text')}>{new Date(userData.dob).toLocaleDateString(undefined)}</div>
              </div>
              {/* <div className={cx('line')}>
                  <div className={cx('label')}>Address:</div>
                  <div className={cx('text')}>...</div>
                </div> */}
            </>
            <h2 className={cx('title')}>Contact Infomation</h2>
            <>
              <div className={cx('line')}>
                <div className={cx('label')}>Phone:</div>
                <div className={cx('text')}>{userData.phoneNumber || ''}</div>
              </div>
              <div className={cx('line')}>
                <div className={cx('label')}>Mail:</div>
                <div className={cx('text')}>{userData.email || ''}</div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

//InfoTab.propTypes = {}

export default InfoTab;
