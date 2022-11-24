import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as authServices from 'services/authServices';
import ToastPortal from 'components/ToastPortal';
import config from 'configs/index';
import styles from './LoginForm.module.scss';
import Cookies from 'js-cookie';
import { useNotification } from 'hooks';
import useEnterPress from 'hooks/useEnterPress';

const cx = classNames.bind(styles);

function LoginForm() {
    const navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
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
            rememberMe: false
        });

        if (response.isSuccess === false) {
            setLoading(false);
            Notify('error', response.message);
        }

        if (response.isSuccess === true) {
            Cookies.set('jwt', response.resultObj.token, { expires: 30 / 1440, secure: true });
            Cookies.set('user-id', response.resultObj.userId, { expires: 30 / 1440, secure: true });
            Notify('success', 'Login Successfully');
            const timerId = setTimeout(() => {
                clearTimeout(timerId);
                setLoading(false);
                navigate(config.routes.dashboard, { replace: true });
            }, 3000);
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

        login();
    };

    useEnterPress(buttonRef, handleClick);

    return (
        <>
            <div>
                {/* <div className={cx('title')}>LOGIN</div> */}
                <div className={cx('container')}>
                    <>
                        <span className={cx('username-label')}>User Name</span>
                        <input
                            className={cx('username-input')}
                            type="text"
                            placeholder="Enter your username"
                            value={usernameInput}
                            onChange={(e) => {
                                setUsernameInput(e.currentTarget.value);
                            }}
                        />
                    </>
                    <>
                        <span className={cx('password-label')}>Password</span>
                        <input
                            className={cx('password-input')}
                            type="password"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={(e) => {
                                setPasswordInput(e.currentTarget.value);
                            }}
                        />
                    </>
                    {loading ? (
                        <div className={cx('loading')}>
                            <span></span>
                        </div>
                    ) : (
                        <button className={cx('button')} onClick={handleClick}>
                            Login
                        </button>
                    )}
                    <Link to={config.routes.forgetPassword} className={cx('link')} ref={buttonRef}>
                        Forgot your Password?
                    </Link>
                </div>
            </div>
            <ToastPortal ref={toastRef} autoClose={true} />
        </>
    );
}

export default LoginForm;
