import DropDown from "./DropDown"
import DropDownItem from "./DropDownItem"
import styles from "./NavBar.scss?type=global"
import NavBarContext from "./contexts/NavBarContext"
import VersionContext from "./contexts/VersionContext"
import classNames from "classnames"
import throttle from "lodash/throttle"
import Link from "next/link"
import { useContext, useEffect, useRef, useState } from "react"
import { ExternalLink } from "react-feather"

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
            <a>
              <img src={require("../assets/logo.svg")} alt="Vert.x Logo" />
            </a>
          </Link>
        </div>

        <div className="navbar-collapse-button" onClick={onClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          className={classNames("navbar-right", { collapse })}
          ref={refRight}
          style={{ maxHeight: rightMaxHeight }}
        >
          <div className="navbar-menu">
            <span className="navbar-menu-item with-drop-down">
              <DropDown title="Start">
                <Link href="/introduction-to-vertx-and-reactive/">
                  <a>
                    <DropDownItem>Intro to reactive</DropDownItem>
                  </a>
                </Link>
                <Link href="/get-started/">
                  <a>
                    <DropDownItem>Get started</DropDownItem>
                  </a>
                </Link>
                <a
                  href="https://start.vertx.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropDownItem>
                    App generator{" "}
                    <ExternalLink className="external-link-icon" size="1em" />
                  </DropDownItem>
                </a>
              </DropDown>
            </span>
            {currentVersion.version ? (
              <Link href={`/docs/${currentVersion.version}/`}>
                <a className="navbar-menu-item">Docs</a>
              </Link>
            ) : (
              <Link href="/docs/">
                <a className="navbar-menu-item">Docs</a>
              </Link>
            )}
            <span className="navbar-menu-item with-drop-down">
              <DropDown title="Resources">
                <Link href="/faq/">
                  <a>
                    <DropDownItem>FAQ</DropDownItem>
                  </a>
                </Link>
                <Link href="/channels/">
                  <a>
                    <DropDownItem>Channels</DropDownItem>
                  </a>
                </Link>
                <a
                  href="https://how-to.vertx.io/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropDownItem>
                    How-To’s{" "}
                    <ExternalLink className="external-link-icon" size="1em" />
                  </DropDownItem>
                </a>
                <a
                  href="https://github.com/vert-x3/vertx-eventbus-bridge-clients"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropDownItem>
                    EventBus Bridge Clients{" "}
                    <ExternalLink className="external-link-icon" size="1em" />
                  </DropDownItem>
                </a>
                <a
                  href="https://github.com/vert-x3/advanced-vertx-guide"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropDownItem>
                    Advanced Vert.x Guide{" "}
                    <ExternalLink className="external-link-icon" size="1em" />
                  </DropDownItem>
                </a>
              </DropDown>
            </span>
            <Link href="/blog/">
              <a className="navbar-menu-item">Blog</a>
            </Link>
            <Link href="/community/">
              <a className="navbar-menu-item">Community</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default NavBar
