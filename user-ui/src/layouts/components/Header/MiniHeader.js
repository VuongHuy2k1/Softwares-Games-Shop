import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faNavicon } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames/bind";
import config from "../../../config/index.js";
import images from "../../../assets/images/index.js";
import Button from "../../../components/Button/Button.js";
import styles from "./Header.module.scss";
import { navItems } from "./NavItems.js";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Navbar from "../Navbar";
import React from "react";
const cx = classNames.bind(styles);

function MiniHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <header className={cx("nar-bar")}>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className={cx("drawer")}
        styles={{ backgroutColor: "black" }}
      >
        <Navbar />
      </Drawer>
      <div className={cx("nar-bar-container")} onClick={toggleDrawer}>
        <FontAwesomeIcon icon={faNavicon} className={cx("iconNav")} />
      </div>
      <div className={cx("header-logo")}>
        <Link to={config.routes.home}>
          <img src={images.logo} alt="Gaming store" />
        </Link>
      </div>
    </header>
  );
}

export default MiniHeader;
