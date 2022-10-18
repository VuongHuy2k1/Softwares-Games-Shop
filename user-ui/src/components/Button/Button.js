<<<<<<< HEAD
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
=======
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4

const cx = classNames.bind(styles);

function Button({
  to,
  href,
<<<<<<< HEAD
  btn = false,
  btnAnimation = false,
=======
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  disabled = false,
  small = false,
  large = false,
  wishlist = false,
  cart = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
<<<<<<< HEAD
  let Comp = "button";
=======
  let Comp = 'button';
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
  const props = {
    onClick,
    ...passProps,
  };

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
<<<<<<< HEAD
      if (key.startsWith("on") && typeof props[key] === "function") {
=======
      if (key.startsWith('on') && typeof props[key] === 'function') {
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
<<<<<<< HEAD
    Comp = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    btnAnimation,
    btn,
=======
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    primary,
    outline,
    text,
    disabled,
    rounded,
    wishlist,
    cart,
    small,
    large,
  });

  return (
    <Comp className={classes} {...props}>
<<<<<<< HEAD
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
=======
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    </Comp>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  wishlist: PropTypes.bool,
  cart: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
