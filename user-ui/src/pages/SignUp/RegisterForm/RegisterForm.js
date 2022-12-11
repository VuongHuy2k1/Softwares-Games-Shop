import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSignUpDataSuccess } from 'src/store/reducers/signUp';
import ToastPortal from 'src/components/ToastPortal';
import config from 'src/config';
import { useNotification } from 'src/hooks';
import useEnterPress from 'src/hooks/useEnterPress';
import * as authServices from 'src/services/authServices';

import styles from './RegisterForm.module.scss';
const cx = classNames.bind(styles);

function RegisterForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const register = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.register({
      email: emailInput,
      userName: usernameInput,
      password: passwordInput,
      confirmPassword: rePasswordInput,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', response.message);
    }
    if (response.isSuccess === true) {
      Notify('success', 'Mã xác nhận đã được gửi đến Email của bạn');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        dispatch(getSignUpDataSuccess({ data: { usernameInput, passwordInput } }));

        navigate(config.routes.signupCheck, { replace: true });
      }, 2000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (usernameInput === '') {
      msg = 'Vui lòng điền tên người dùng';
      if (passwordInput === '') {
        msg = 'Vui lòng điền đầy đủ';
      }
      Notify('warning', msg);
      return;
    }
    if (passwordInput === '') {
      msg = 'Vui lòng điền mật khẩu';
      Notify('warning', msg);
      return;
    }
    if (passwordInput.length < 6) {
      msg = 'Mật khẩu phải có ít nhất 6 ký tự';
      Notify('warning', msg);
      return;
    }
    if (passwordInput !== rePasswordInput) {
      msg = 'Mật khẩu xác nhận không khớp';
      Notify('warning', msg);
      return;
    }
    if (emailInput === '') {
      msg = 'Vui lòng điền Email';
      Notify('warning', msg);
      return;
    }

    var emailRegex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (emailRegex.test(emailInput) === false) {
      msg = 'Email không hợp lệ! Hãy thử lại';
      Notify('warning', msg);
      return;
    }
    register();
  };
  const buttonRef = useRef();
  useEnterPress(buttonRef, handleClick);

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('title')}>TẠO TÀI KHOẢN</div>
        <div className={cx('container')}>
          <div className={cx('inputBox')}>
            <input
              type="text"
              placeholder=" "
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.currentTarget.value);
              }}
            />
            <span>Tên người dùng</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              type="password"
              placeholder=" "
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.currentTarget.value);
              }}
            />
            <span>Mật khẩu</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              type="password"
              placeholder=" "
              value={rePasswordInput}
              onChange={(e) => {
                setRePasswordInput(e.currentTarget.value);
              }}
            />
            <span>Xác nhận Mật khẩu</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              type="email"
              placeholder=" "
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.currentTarget.value);
              }}
            />
            <span>Email</span>
          </div>
          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <button className={cx('button')} onClick={handleClick} ref={buttonRef}>
              Đăng ký
            </button>
          )}
          <Link to={config.routes.login} className={cx('link')}>
            Bạn đã có tài khoản?
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default RegisterForm;
