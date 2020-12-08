import NavBarContext from "./contexts/NavBarContext"
import VersionContext from "./contexts/VersionContext"
import classNames from "classnames"
import Link from "next/link"
import "./NavBar.scss"
import { useContext, useEffect, useRef, useState } from "react"
import throttle from "lodash/throttle"

import { Awesomelists, Discord, Stackoverflow, Youtube } from "@icons-pack/react-simple-icons"

const NavBar = () => {
  const refNavBar = useRef()
  const refRight = useRef()
  const [collapse, setCollapse] = useState(false)
  const [rightMaxHeight, setRightMaxHeight] = useState(undefined)
  const setNavBarState = useContext(NavBarContext.Dispatch)
  const currentVersion = useContext(VersionContext.State)

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
            {currentVersion.version ? (
              <Link href={`/docs/${currentVersion.version}/`}>
                <a className="navbar-menu-item">Docs</a>
              </Link>
            ) : (
              <Link href="/docs/">
                <a className="navbar-menu-item">Docs</a>
              </Link>
            )}
            <Link href="/faq/">
              <a className="navbar-menu-item">FAQ</a>
            </Link>
            <Link href="/blog/">
              <a className="navbar-menu-item">Blog</a>
            </Link>
            <Link href="/community/">
              <a className="navbar-menu-item">Community</a>
            </Link>
          </div>

          <div className="navbar-social">
            <a href="https://github.com/vert-x3/vertx-awesome" className="navbar-social-link" title="Awesome Vert.x" target="_blank" rel="noopener noreferrer">
              <Awesomelists aria-label="List of awesome Vert.x projects" title="Awesome Vert.x" />
            </a>
            <a href="https://stackoverflow.com/questions/tagged/vert.x" className="navbar-social-link" title="Stack Overflow" target="_blank" rel="noopener noreferrer">
              <Stackoverflow aria-label="Stack Overflow questions related to Vert.x" />
            </a>
            <a href="https://www.youtube.com/channel/UCGN6L3tRhs92Uer3c6VxOSA" className="navbar-social-link" title="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube aria-label="YouTube channel of Vert.x" />
            </a>
            <a href="https://discord.gg/KzEMwP2" className="navbar-social-link" title="Discord" target="_blank" rel="noopener noreferrer">
              <Discord aria-label="Eclipse Vert.x channel on Discord" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
