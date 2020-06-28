import NavBarContext from "./contexts/NavBarContext"
import classNames from "classnames"
import Link from "next/link"
import "./NavBar.scss"
import { useContext, useEffect, useRef, useState } from "react"
import throttle from "lodash/throttle"

import Gitter from "@icons-pack/react-simple-icons/lib/Gitter"
import Stackoverflow from "@icons-pack/react-simple-icons/lib/Stackoverflow"
import Youtube from "@icons-pack/react-simple-icons/lib/Youtube"

export default () => {
  const refNavBar = useRef()
  const refRight = useRef()
  const [collapse, setCollapse] = useState(false)
  const [rightMaxHeight, setRightMaxHeight] = useState(undefined)
  const setNavBarState = useContext(NavBarContext.Dispatch)

  useEffect(() => {
    function updateHeight() {
      let height = refNavBar.current.clientHeight
      setNavBarState({ height })
    }

    updateHeight()

    let throttledUpdateheight = throttle(updateHeight, 100)
    window.addEventListener("resize", throttledUpdateheight)

    return () => {
      window.removeEventListener("resize", throttledUpdateheight)
    }
  }, [setNavBarState])

  const onClick = () => {
    let height = 0
    for (let c of refRight.current.children) {
      height += c.offsetHeight
    }

    if (collapse) {
      setCollapse(false)
      setRightMaxHeight(undefined)
    } else {
      setCollapse(true)
      setRightMaxHeight(height)
    }
  }

  return (
    <div className="navbar" ref={refNavBar}>
      <div className="navbar-content container">
        <div className="navbar-logo">
          <Link href="/">
            <a><img src={require("../assets/logo.svg")} alt="Vert.x Logo" /></a>
          </Link>
        </div>

        <div className="navbar-collapse-button" onClick={onClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={classNames("navbar-right", { collapse })}
            ref={refRight} style={{ maxHeight: rightMaxHeight }}>
          <div className="navbar-menu">
            <Link href="/introduction-to-vertx-and-reactive/">
              <a className="navbar-menu-item">Intro</a>
            </Link>
            <Link href="/docs/">
              <a className="navbar-menu-item">Docs</a>
            </Link>
            <Link href="/faq/">
              <a className="navbar-menu-item">FAQ</a>
            </Link>
            <Link href="/blog/">
              <a className="navbar-menu-item">Blog</a>
            </Link>
            <Link href="/">
              <a className="navbar-menu-item">Community</a>
            </Link>
          </div>

          <div className="navbar-social">
            <span className="navbar-social-version">v4.0.0</span>
            <a href="https://www.youtube.com/results?search_query=vert.x" className="navbar-social-link" title="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube aria-label="YouTube videos related to Vert.x" />
            </a>
            <a href="https://stackoverflow.com/questions/tagged/vert.x" className="navbar-social-link" title="Stack Overflow" target="_blank" rel="noopener noreferrer">
              <Stackoverflow aria-label="Stack Overflow questions related to Vert.x" />
            </a>
            <a href="https://gitter.im/eclipse-vertx/vertx-users" className="navbar-social-link" title="Gitter" target="_blank" rel="noopener noreferrer">
              <Gitter aria-label="Eclipse Vert.x channel on Gitter" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
