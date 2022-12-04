import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingUpDataSuccess } from 'src/store/reducers/singUp';
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
      Notify('success', 'You must enter code to activate account ');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        dispatch(getSingUpDataSuccess({ data: { usernameInput, passwordInput } }));

        navigate(config.routes.signupCheck, { replace: true });
      }, 2000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (usernameInput === '') {
      msg = 'Please re-fill your Username';
      if (passwordInput === '') {
        msg = 'Please re-fill your Username and Password';
      }
      Notify('warning', msg);
      return;
    }
    if (passwordInput === '') {
      msg = 'Please re-fill your Password';
      Notify('warning', msg);
      return;
    }
    if (passwordInput.length < 6) {
      msg = 'Password must have at least 6 characters';
      Notify('warning', msg);
      return;
    }
    if (passwordInput !== rePasswordInput) {
      msg = 'Confirm password is not match';
      Notify('warning', msg);
      return;
    }
    if (emailInput === '') {
      msg = 'Please re-fill your Email';
      Notify('warning', msg);
      return;
    }

    var emailRegex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (emailRegex.test(emailInput) === false) {
      msg = 'Invalid Email, Please try again';
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
        <div className={cx('title')}>CREATE YOUR ACCOUNT</div>
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
            <span>User Name</span>
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
            <span>Password</span>
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
            <span>Re-Password</span>
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
              Register
            </button>
          )}
          <Link to={config.routes.login} className={cx('link')}>
            Already have an Account?
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default RegisterForm;
