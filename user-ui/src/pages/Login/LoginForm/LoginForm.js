import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as authServices from 'src/services/authServices';
import ToastPortal from 'src/components/ToastPortal';
import config from 'src/config';
import styles from './LoginForm.module.scss';
import Cookies from 'js-cookie';
import { useNotification } from 'src/hooks';
import useEnterPress from 'src/hooks/useEnterPress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function LoginForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const handleCheck = () => {
    setCheck(!check);
  };

  const toastRef = useRef();
  const buttonRef = useRef();
  const Notify = useNotification(toastRef);
  // var mediumRegex = new RegExp(
  //   '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  // );
  // console.log(mediumRegex.test(passwordInput));

  const login = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.login({
      userName: usernameInput,
      password: passwordInput,
      rememberMe: false,
    });

    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', 'Có gì đó sai sai');
    }

    if (response.isSuccess === true) {
      Cookies.set('jwt', response.resultObj.token, { expires: 30 / 1440, secure: true });
      Cookies.set('user-id', response.resultObj.userId, { expires: 30 / 1440, secure: true });
      Notify('success', 'Đăng nhập thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.home, { replace: true });
      }, 3000);
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

    login();
  };

  useEnterPress(buttonRef, handleClick);

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('title')}>ĐĂNG NHẬP</div>
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
              type={check ? 'text' : 'password'}
              placeholder=" "
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.currentTarget.value);
              }}
            />
            <span>Mật khẩu</span>
          </div>
          <div className={cx('check')} onClick={handleCheck}>
            <FontAwesomeIcon icon={check ? faEye : faEyeSlash} className={cx('seen')} />

            <span>See password</span>
          </div>

          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <button className={cx('button')} onClick={handleClick}>
              Đăng nhập
            </button>
          )}
          <Link to={config.routes.forgetPassword} className={cx('link')} ref={buttonRef}>
            Quên mật khẩu?
          </Link>
          <Link to={config.routes.signupCheck} className={cx('link')} ref={buttonRef}>
            Bạn chưa kích hoạt tài khoản?
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default LoginForm;
