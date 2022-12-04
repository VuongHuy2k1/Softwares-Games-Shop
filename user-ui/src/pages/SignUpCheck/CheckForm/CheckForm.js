import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singUpSelector, getSingUpData } from 'src/store/reducers/singUp';
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
  const userData = useSelector(singUpSelector);
  // const [signData, setSignData] = useState([]);
  console.log(userName);
  useEffect(() => {
    setUserName(userData?.data?.usernameInput);
    setPassword(userData?.data?.usernameInput);
  }, [userData]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingUpData());
  }, []);

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
      Notify('success', 'Register Successfully');
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
      msg = 'Please re-fill your Username';
      if (password === '') {
        msg = 'Please re-fill your Username and Password';
      }
      Notify('warning', msg);
      return;
    }
    if (password === '') {
      msg = 'Please re-fill your Password';
      Notify('warning', msg);
      return;
    }
    if (codeInput === '') {
      msg = 'Please re-fill your Code';
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
        <div className={cx('title')}>ENRER YOUR CODE</div>
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
            <span>Your Name</span>
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
            <span>Password</span>
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
            <span>Your Code</span>
          </div>
          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <button className={cx('button')} onClick={handleClick} ref={buttonRef}>
              Register
            </button>
          )}
          <Link to={config.routes.sendCode} className={cx('link')}>
            You want to get the code back
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default CheckForm;
