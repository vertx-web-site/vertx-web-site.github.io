import classNames from "classnames"
import { useCallback, useContext, useEffect, useRef } from "react"
import Router from "next/router"
import { smoothScrollTo } from "../lib/scroll-utils"
import NavBarContext from "../contexts/NavBarContext"
import Header from "../Header"
import Footer from "../Footer"
import styles from "./Page.scss?type=global"

const Layout = ({ meta = {}, narrow, hashSmoothScroll = false, children }) => {
  const navBarState = useContext(NavBarContext.State)
  const containerRef = useRef()

  const onHashChangeStart = useCallback((url, initial) => {
    let hash = url.substring(url.indexOf("#") + 1)
    let target = document.getElementById(hash)
    if (!target) {
      return
    }

    let offset = target.offsetTop - navBarState.height
    smoothScrollTo(offset, initial ? 200 : 500)
  }, [navBarState.height])

  const onHashChange = useCallback((e) => {
    onHashChangeStart(e.newURL)
  }, [onHashChangeStart])

  // replace internal links' onclick with Router.push() so we can scroll smoothly
  const replaceInternalLinks = useCallback((ref) => {
    let internalLinks = ref.current.querySelectorAll("a[href^='#']")
    for (let il of internalLinks) {
      il.onclick = (e) => {
        e.preventDefault()
        let href = window.location.href
        let hash = href.substring(href.indexOf("#"))
        if (hash !== il.getAttribute("href")) {
          Router.push(window.location.pathname + il.getAttribute("href"))
        } else {
          onHashChangeStart(href)
        }
      }
    }
  }, [onHashChangeStart])

  useEffect(() => {
    if (hashSmoothScroll) {
      Router.events.on("hashChangeStart", onHashChangeStart)
      window.addEventListener("hashchange", onHashChange)

      replaceInternalLinks(containerRef)

      // initial scroll
      onHashChangeStart(window.location.href, true)
    }

    return () => {
      if (hashSmoothScroll) {
        window.removeEventListener("hashchange", onHashChange)
        Router.events.off("hashChangeStart", onHashChangeStart)
      }
    }
  }, [onHashChange, onHashChangeStart, replaceInternalLinks, hashSmoothScroll])

  return (
    <main className="page">
      <Header title={meta.title}/>
      <div className="page-content">
        <div className={classNames("container", { "container-narrow": narrow })}
            ref={containerRef}>
          {children}
        </div>
      </div>
      <Footer />
      <style jsx>{styles}</style>
    </main>
  )
}

export default Layout
