//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'src/components/Button';
import ToastPortal from 'src/components/ToastPortal';
import { useNotification } from 'src/hooks';
import * as contactServices from 'src/services/contactServices';

import { userSelector } from 'src/store/reducers/userSlice';

import styles from './ContactForm.module.scss';
const cx = classNames.bind(styles);
function ContactForm() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector(userSelector);
  const [userData, setUserData] = useState({
    email: '',
  });
  useEffect(() => {
    if (userInfo.data !== undefined) {
      setUserData(userInfo.data);
      setEmail(userData.email || '');
    }
  }, [userInfo, userData.email]);

  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const makeContact = async () => {
    setLoading(true);

    const response = await contactServices.contact({
      title: title,
      email: email,
      content: content,
    });
    console.log(response);
    if (response.isSuccess === false) {
      setLoading(false);
      Notify('error', response.message);
    }
    if (response.isSuccess === true) {
      Notify('success', 'Register Successfully');
      const timerId = setTimeout(() => {
        setTitle('');
        setEmail('');
        setContent('');
        setLoading(false);
        inputRef.current.focus();
        clearTimeout(timerId);
      }, 3000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (title === '') {
      msg = 'Please re-fill the Title';
      Notify('warning', msg);
      return;
    }
    if (content === '') {
      msg = 'Please re-fill the Content';
      Notify('warning', msg);
      return;
    }
    var emailRegex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (emailRegex.test(email) === false) {
      msg = 'Invalid Email, Please try again';
      Notify('warning', msg);
      return;
    }

    makeContact();
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className={cx('wrapper')}>
        <h2 className={cx('title')}>Contact Us</h2>
        <div className={cx('container')}>
          <div className={cx('inputBox')}>
            <input
              placeholder=" "
              ref={inputRef}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
              value={title}
            />
            <span>Title</span>
          </div>
          <div className={cx('inputBox')}>
            <input
              placeholder=" "
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              value={email}
            />
            <span>Your Email</span>
          </div>
          <div className={cx('inputBox')}>
            <textarea
              rows={10}
              placeholder=" "
              onChange={(e) => {
                setContent(e.currentTarget.value);
              }}
              value={content}
            />
            <span>Content</span>
          </div>
          {loading ? (
            <div className={cx('loading')}>
              <span></span>
            </div>
          ) : (
            <Button className={cx('submit-button')} onClick={handleClick}>
              Send
            </Button>
          )}
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

//ContactForm.propTypes = {}

export default ContactForm;
