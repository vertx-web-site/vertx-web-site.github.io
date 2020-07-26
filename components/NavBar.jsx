import NavBarContext from "./contexts/NavBarContext"
import VersionContext from "./contexts/VersionContext"
import DropDown from "./DropDown"
import DropDownItem from "./DropDownItem"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import "./NavBar.scss"
import { useContext, useEffect, useRef, useState } from "react"
import throttle from "lodash/throttle"

import { Awesomelists, Gitter, Stackoverflow, Youtube } from "@icons-pack/react-simple-icons"

// load docs metadata to get available versions
const docsVersions = require.context("../docs/metadata", false, /\.jsx$/)
  .keys().map(m => m.substring(2, m.length - 4)).sort().reverse()

export default () => {
  const router = useRouter()
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
              <Link href="/docs/[...slug]" as={`/docs/${currentVersion.version}/`}>
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
            <Link href="/">
              <a className="navbar-menu-item">Community</a>
            </Link>
          </div>

          <div className="navbar-social">
            <DropDown title={`v${currentVersion.version || docsVersions[0]}`}>
              <DropDownItem active={currentVersion.version === undefined ||
                    currentVersion.version === docsVersions[0]}
                  onClick={() => router.push("/docs/")}>
                Latest (v{docsVersions[0]})
              </DropDownItem>
              {docsVersions.slice(1).map(v => (
                <DropDownItem key={v} active={currentVersion.version === v}
                    onClick={() => router.push("/docs/[...slug]", `/docs/${v}`)}>
                  v{v}
                </DropDownItem>
              ))}
            </DropDown>

            <a href="https://github.com/vert-x3/vertx-awesome" className="navbar-social-link" title="Awesome Vert.x" target="_blank" rel="noopener noreferrer">
              <Awesomelists aria-label="List of awesome Vert.x projects" title="Awesome Vert.x" />
            </a>
            <a href="https://stackoverflow.com/questions/tagged/vert.x" className="navbar-social-link" title="Stack Overflow" target="_blank" rel="noopener noreferrer">
              <Stackoverflow aria-label="Stack Overflow questions related to Vert.x" />
            </a>
            <a href="https://www.youtube.com/results?search_query=vert.x" className="navbar-social-link" title="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube aria-label="YouTube videos related to Vert.x" />
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
