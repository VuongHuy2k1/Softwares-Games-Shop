import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ToastPortal from 'src/components/ToastPortal';
import config from 'src/config';
import { useNotification } from 'src/hooks';
// import { Link } from 'react-router-dom';
// import config from 'src/config';
import styles from './ForgetPasswordForm.module.scss';
import * as userServices from 'src/services/userServices';
import useEnterPress from 'src/hooks/useEnterPress';

const cx = classNames.bind(styles);

function ForgetPasswordForm() {
  const [userInput, setUserInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const editPassword = async () => {
    setLoading(true);
    const response = await userServices.forgotPassword({
      userName: userInput,
      email: emailInput,
      newPassword: newPasswordInput,
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
        navigate(config.routes.login, { replace: true });
      }, 2000);
    }
  };
  const handleClick = () => {
    var msg = '';
    if (userInput === '') {
      msg = 'Please re-fill your Username';
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
    if (newPasswordInput === '') {
      msg = 'Please re-fill your new Password';
      Notify('warning', msg);
      return;
    }
    if (newPasswordInput.length < 6) {
      msg = 'Password must have at least 6 characters';
      Notify('warning', msg);
      return;
    }
    if (newPasswordInput !== rePasswordInput) {
      msg = 'Confirm password is not match';
      Notify('warning', msg);
      return;
    }
    editPassword();
  };

  const buttonRef = useRef();
  useEnterPress(buttonRef, handleClick);
  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('title')}>RESET PASSWORD</div>
        <div className={cx('container')}>
          <>
            <span className={cx('label')}>Username</span>
            <input
              className={cx('username-input')}
              type="text"
              placeholder="Enter your Username"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.currentTarget.value);
              }}
            />
          </>
          <>
            <span className={cx('label')}>Email</span>
            <input
              className={cx('username-input')}
              type="text"
              placeholder="Enter your Email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.currentTarget.value);
              }}
            />
          </>
          <>
            <span className={cx('label')}>New Password</span>
            <input
              className={cx('password-input')}
              type="password"
              placeholder="New Password"
              value={newPasswordInput}
              onChange={(e) => {
                setNewPasswordInput(e.currentTarget.value);
              }}
            />
          </>
          <>
            <span className={cx('label')}>Re-Password</span>
            <input
              className={cx('password-input')}
              type="password"
              placeholder="Re-Password"
              value={rePasswordInput}
              onChange={(e) => {
                setRePasswordInput(e.currentTarget.value);
              }}
            />
          </>
          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <button type="button" className={cx('button')} onClick={handleClick} ref={buttonRef}>
              Submit
            </button>
          )}
          <Link to={config.routes.login} className={cx('link')}>
            Back to Login!
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default ForgetPasswordForm;
