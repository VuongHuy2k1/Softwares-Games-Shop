import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpSelector, getSignUpData } from 'src/store/reducers/signUp';
import { useSelector, useDispatch } from 'react-redux';
import ToastPortal from 'src/components/ToastPortal';
import config from 'src/config';
import { useNotification } from 'src/hooks';
import useEnterPress from 'src/hooks/useEnterPress';
import * as authServices from 'src/services/authServices';

import styles from './CheckForm.module.scss';
const cx = classNames.bind(styles);

function CheckForm() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const userData = useSelector(signUpSelector);
  // const [signData, setSignData] = useState([]);
  console.log(userName);
  useEffect(() => {
    setUserName(userData?.data?.usernameInput);
    setPassword(userData?.data?.passwordInput);
  }, [userData]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSignUpData());
  }, [dispatch]);

  const register = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.registerCheck({
      confirmcode: codeInput,
      userName: userName,
      password: password,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', response.message);
    }
    if (response.isSuccess === true) {
      Notify('success', 'Đăng ký thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.login, { replace: true });
      }, 2000);
    }
  };
  const handleClick = () => {
    var msg = '';
    if (userName === '') {
      msg = 'Vui lòng điền tên người dùng';
      if (password === '') {
        msg = 'Vui lòng điền mật khẩu';
      }
      Notify('warning', msg);
      return;
    }
    if (password === '') {
      msg = 'Vui lòng điền mật khẩu';
      Notify('warning', msg);
      return;
    }
    if (codeInput === '') {
      msg = 'Vui lòng nhập mã xác nhận';
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
        <div className={cx('title')}>XÁC NHẬN TÀI KHOẢN</div>
        <div className={cx('container')}>
          <div className={cx('inputBox')}>
            <input
              type="text"
              placeholder=" "
              value={userName}
              onChange={(e) => {
                setUserName(e.currentTarget.value);
              }}
            />
            <span>Tên người dùng</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <span>Mật khẩu</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              type="text"
              placeholder=" "
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.currentTarget.value);
              }}
            />
            <span>Mã xác nhận</span>
          </div>
          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <button className={cx('button')} onClick={handleClick} ref={buttonRef}>
              Gửi
            </button>
          )}
          <Link to={config.routes.sendCode} className={cx('link')}>
            Nếu chưa có mã xác nhận, hãy ấn vào <strong>đây</strong> trước!
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default CheckForm;
