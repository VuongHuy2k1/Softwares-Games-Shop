//import PropTypes from 'prop-types';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as userServices from 'src/services/userServices';
import * as authServices from 'src/services/authServices';
import ToastPortal from 'src/components/ToastPortal';
import { useNotification } from 'src/hooks';
import { userSelector } from 'src/store/reducers/userSlice';
import config from 'src/config';

import styles from './ChangePasswordTab.module.scss';
const cx = classNames.bind(styles);

function ChangePasswordTab() {
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector(userSelector);
  const navigate = useNavigate();

  const editPassword = async () => {
    setLoading(true);
    const response = await userServices.changePassword({
      userName: userInfo.data.userName,
      password: password,
      newPassword: newPassword,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', response.message);
    }
    if (response.isSuccess === true) {
      Notify('success', 'Change Successfully');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        authServices.logout();
        navigate(config.routes.login, { replace: true });
      }, 2000);
    }
  };
  const handleClick = () => {
    var msg = '';
    if (password === '') {
      msg = 'Please re-fill your Password';
      Notify('warning', msg);
      return;
    }
    if (newPassword.length < 6) {
      msg = 'Password must have at least 6 characters';
      Notify('warning', msg);
      return;
    }
    if (newPassword !== reNewPassword) {
      msg = 'Confirm password is not match';
      Notify('warning', msg);
      return;
    }
    editPassword();
  };
  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>
          <FontAwesomeIcon icon={faLock} className={cx('icon')} />
          change password
        </h2>
        <div className={cx('content')}>
          <div className={cx('line')}>
            <div className={cx('label')}>Password</div>
            <input
              className={cx('input')}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>
          <div className={cx('line')}>
            <div className={cx('label')}>New Password</div>
            <input
              className={cx('input')}
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.currentTarget.value);
              }}
            />
          </div>
          <div className={cx('line')}>
            <div className={cx('label')}>Re-Password</div>
            <input
              className={cx('input')}
              type="password"
              value={reNewPassword}
              onChange={(e) => {
                setReNewPassword(e.currentTarget.value);
              }}
            />
          </div>
          <div className={cx('action')}>
            {loading ? (
              <div className={cx('loading')}>
                <span></span>
              </div>
            ) : (
              <button className={cx('confirm-button')} onClick={handleClick}>
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

//ChangePasswordTab.propTypes = {}

export default ChangePasswordTab;
