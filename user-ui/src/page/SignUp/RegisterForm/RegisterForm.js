import classNames from "classnames/bind";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import ToastPortal from "../../../components/ToastPortal/ToastPortal";
import config from "../../../config";
import { useNotification } from "../../../hooks";
import useEnterPress from "../../../hooks/useEnterPress";
import * as authServices from "../../../services/authServices";

import styles from "./RegisterForm.module.scss";
const cx = classNames.bind(styles);

function RegisterForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rePasswordInput, setRePasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
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
      Notify("error", response.message);
    }
    if (response.isSuccess === true) {
      Notify("success", "Register Successfully");
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.login, { replace: true });
      }, 3000);
    }
  };
  const handleClick = () => {
    var msg = "";
    if (usernameInput === "") {
      msg = "Please re-fill your Username";
      if (passwordInput === "") {
        msg = "Please re-fill your Username and Password";
      }
      Notify("warning", msg);
      return;
    }
    if (passwordInput === "") {
      msg = "Please re-fill your Password";
      Notify("warning", msg);
      return;
    }
    if (passwordInput.length < 6) {
      msg = "Password must have at least 6 characters";
      Notify("warning", msg);
      return;
    }
    if (passwordInput !== rePasswordInput) {
      msg = "Confirm password is not match";
      Notify("warning", msg);
      return;
    }
    if (emailInput === "") {
      msg = "Please re-fill your Email";
      Notify("warning", msg);
      return;
    }

    var emailRegex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (emailRegex.test(emailInput) === false) {
      msg = "Invalid Email, Please try again";
      Notify("warning", msg);
      return;
    }
    register();
  };
  const buttonRef = useRef();
  useEnterPress(buttonRef, handleClick);

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("title")}>CREATE YOUR ACCOUNT</div>
        <div className={cx("container")}>
          <>
            <span className={cx("label")}>User Name</span>
            <input
              className={cx("username-input")}
              type="text"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.currentTarget.value);
              }}
            />
          </>
          <>
            <span className={cx("label")}>Password</span>
            <input
              className={cx("password-input")}
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.currentTarget.value);
              }}
            />
          </>
          <>
            <span className={cx("label")}>Re-Password</span>
            <input
              className={cx("password-input")}
              type="password"
              placeholder="Re-Password"
              value={rePasswordInput}
              onChange={(e) => {
                setRePasswordInput(e.currentTarget.value);
              }}
            />
          </>
          <>
            <span className={cx("label")}>Email</span>
            <input
              className={cx("email-input")}
              type="email"
              placeholder="Email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.currentTarget.value);
              }}
            />
          </>
          {loading ? (
            <div className={cx("loading")}>
              <span></span>
            </div>
          ) : (
            <button
              className={cx("button")}
              onClick={handleClick}
              ref={buttonRef}
            >
              Register
            </button>
          )}
          <Link to={config.routes.login} className={cx("link")}>
            Already have an Account?
          </Link>
        </div>
      </div>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default RegisterForm;
