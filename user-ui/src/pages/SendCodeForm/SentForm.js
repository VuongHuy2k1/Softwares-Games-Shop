import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authServices from 'src/services/authServices';
import ToastPortal from 'src/components/ToastPortal';
import styles from './Sent.module.scss';
import Cookies from 'js-cookie';
import { useNotification } from 'src/hooks';
import useEnterPress from 'src/hooks/useEnterPress';

const cx = classNames.bind(styles);

function SentForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const toastRef = useRef();
  const buttonRef = useRef();
  const Notify = useNotification(toastRef);

  const send = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.sendCode({
      userName: usernameInput,
    });

    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', response.message);
    }

    if (response.isSuccess === true) {
      Cookies.set('jwt', response.resultObj.token, { expires: 30 / 1440, secure: true });
      Cookies.set('user-id', response.resultObj.userId, { expires: 30 / 1440, secure: true });
      Notify('success', 'We have sent the code to your email');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(-1);
      }, 2000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (usernameInput === '') {
      msg = 'Please re-fill your Username';
      Notify('warning', msg);
      return;
    }
    send();
  };

  useEnterPress(buttonRef, handleClick);

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('close')}></div>
        <div className={cx('title')}>RESEND CODE</div>
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

          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <button className={cx('button')} onClick={handleClick}>
              Send
            </button>
          )}
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default SentForm;
