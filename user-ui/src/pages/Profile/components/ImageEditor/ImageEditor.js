//import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUserData, userSelector } from 'src/store/reducers/userSlice';
import * as imageServices from 'src/services/imageServices';
import * as userServices from 'src/services/userServices';

import styles from './ImageEditor.module.scss';
import { useClickOutside, useNotification } from 'src/hooks';
import ToastPortal from 'src/components/ToastPortal';
const cx = classNames.bind(styles);
const ImageEditor = forwardRef(({ typeImage }, ref) => {
  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
    },
  }));
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(process.env.PUBLIC_URL + '/images/avatar-placeholder.jpg');

  const user = useSelector(userSelector);
  const [userData, setUserData] = useState({ preview: process.env.PUBLIC_URL + '/images/avatar-placeholder.jpg' });
  useLayoutEffect(() => {
    if (user.data !== undefined) {
      setUserData(user.data);
      if (typeImage === 'avatar') {
        setImage({ preview: imageServices.getImage(userData.avatarPath) });
      }
      if (typeImage === 'wallpaper') {
        setImage({ preview: imageServices.getImage(userData.thumbnailPath) });
      }
    }
  }, [user, userData.avatarPath, userData.thumbnailPath, typeImage]);
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.url);
    };
  }, [image]);
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const changeImage = async () => {
    setLoading(true);
    var response;
    if (typeImage === 'avatar') {
      response = await userServices.changeAvatar(image);
    }
    if (typeImage === 'wallpaper') {
      response = await userServices.changeWallpaper(image);
    }

    if (response.isSuccess === true) {
      Notify('success', 'Change Successfully');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        dispatch(getUserData());
        setLoading(false);
        setShow(false);
      }, 3000);
    }
    if (response.isSuccess === false) {
      Notify('error', response.message);
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
      }, 3000);
    }
  };
  const handleChangeImage = (e) => {
    changeImage();
  };
  const handleClose = () => {
    if (!loading) {
      setShow(false);
      if (typeImage === 'avatar') {
        setImage({ preview: imageServices.getImage(userData.avatarPath) });
      }
      if (typeImage === 'wallpaper') {
        setImage({ preview: imageServices.getImage(userData.thumbnailPath) });
      }
    }
  };
  const formRef = useRef();
  useClickOutside(formRef, handleClose);

  return (
    show && (
      <>
        <div className={cx('wrapper')} ref={formRef}>
          <div className={cx('header')}>
            <h2 className={cx('title')}>{`Change ${typeImage}`}</h2>
            <button className={cx('button-close')} onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} className={cx('icon')} />
            </button>
          </div>
          <div className={cx('container')}>
            {typeImage === 'avatar' && <img src={image.preview} alt="" className={cx('avatar-review')} />}
            {typeImage === 'wallpaper' && <img src={image.preview} alt="" className={cx('wallpaper-review')} />}
            <div className={cx('action')}>
              <input type="file" className={cx('upload-input')} onChange={handleChangeFile} />
              {loading ? (
                <div className={cx('loading', 'confirm')}>
                  <span></span>
                </div>
              ) : (
                <button className={cx('button-confirm')} onClick={handleChangeImage}>
                  Apply Change
                </button>
              )}
              {loading ? (
                <div className={cx('loading', 'cancel')}>
                  <span></span>
                </div>
              ) : (
                <button className={cx('button-cancel')} onClick={handleClose}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        <ToastPortal ref={toastRef} autoClose={true} />
      </>
    )
  );
});

//ImageEditor.propTypes = {}

export default ImageEditor;
