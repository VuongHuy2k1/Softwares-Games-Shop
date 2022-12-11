import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ToastPortal from 'src/components/ToastPortal';
import config from 'src/config';
import { useNotification } from 'src/hooks';

import styles from './ForgetPasswordForm.module.scss';
import * as userServices from 'src/services/userServices';
import useEnterPress from 'src/hooks/useEnterPress';

const cx = classNames.bind(styles);

function ForgetPasswordForm() {
  const [userInput, setUserInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const editPassword = async () => {
    setLoading(true);
    const response = await userServices.forgotPassword({
      userName: userInput,
      confirmcode: codeInput,
      email: emailInput,
      newPassword: newPasswordInput,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', 'Có gì đó sai sai');
    }
    if (response.isSuccess === true) {
      Notify('success', 'Đổi mật khẩu thành công');
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
      msg = 'Vui lòng điền tên người dùng';
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
    if (newPasswordInput === '') {
      msg = 'Vui lòng điền mật khẩu';
      Notify('warning', msg);
      return;
    }
    if (newPasswordInput.length < 6) {
      msg = 'Mật khẩu phải có ít nhất 6 ký tự';
      Notify('warning', msg);
      return;
    }
    if (newPasswordInput !== rePasswordInput) {
      msg = 'Mật khẩu xác nhận không khớp';
      Notify('warning', msg);
      return;
    }
    if (codeInput === '') {
      msg = 'Vui lòng điều mã xác nhận trong Email';
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
        <div className={cx('title')}>ĐẶT LẠI MẬT KHẨU</div>
        <div className={cx('container')}>
          <div className={cx('inputBox')}>
            <input
              type="text"
              placeholder=" "
              value={userInput}
              onChange={(e) => {
                setUserInput(e.currentTarget.value);
              }}
            />
            <span>Tên người dùng</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              type="text"
              placeholder=" "
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.currentTarget.value);
              }}
            />
            <span>Email</span>
          </div>

          <div className={cx('inputBox')}>
            <input
              type="password"
              placeholder=" "
              value={newPasswordInput}
              onChange={(e) => {
                setNewPasswordInput(e.currentTarget.value);
              }}
            />
            <span>Mật khẩu mới</span>
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
            <span>Xác nhận mật khẩu</span>
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
            <button type="button" className={cx('button')} onClick={handleClick} ref={buttonRef}>
              Gửi
            </button>
          )}
          <Link to={config.routes.sendCode} className={cx('link')}>
            Nếu chưa có mã xác nhận, hãy ấn vào <strong>đây</strong> trước!
          </Link>
          <Link to={config.routes.login} className={cx('link')}>
            Quay lại đăng nhập!
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default ForgetPasswordForm;
