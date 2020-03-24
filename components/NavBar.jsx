import classNames from "classnames";
import Link from "next/link";
import "./NavBar.scss";
import { useState } from "react";

import Gitter from "@icons-pack/react-simple-icons/lib/Gitter";
import Stackoverflow from "@icons-pack/react-simple-icons/lib/Stackoverflow";
import Youtube from "@icons-pack/react-simple-icons/lib/Youtube";

export default () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-content container">
        <div className="navbar-logo">
          <Link href="/">
            <a><img src={require("../assets/logo.svg")} /></a>
          </Link>
        </div>

        <div className="navbar-collapse-button" onClick={() => setCollapse(!collapse)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={classNames("navbar-right", { collapse })}>
          <div className="navbar-menu">
            <Link href="/">
              <a className="navbar-menu-item">Ecosystem</a>
            </Link>
            <Link href="/">
              <a className="navbar-menu-item">Docs</a>
            </Link>
            <Link href="/">
              <a className="navbar-menu-item">FAQ</a>
            </Link>
            <Link href="/">
              <a className="navbar-menu-item">Blog</a>
            </Link>
            <Link href="/">
              <a className="navbar-menu-item">Community</a>
            </Link>
          </div>

          <div className="navbar-social">
            <a href="/" className="navbar-social-link navbar-social-version">v4.0.0</a>
            <a href="/" className="navbar-social-link"><Youtube /></a>
            <a href="/" className="navbar-social-link"><Stackoverflow /></a>
            <a href="/" className="navbar-social-link"><Gitter /></a>
          </div>
        </div>
      </div>
    </div>
  );
};
