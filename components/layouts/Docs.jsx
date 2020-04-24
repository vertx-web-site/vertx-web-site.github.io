import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"
import classNames from "classnames"
import { smoothScrollTo } from "../lib/scroll-utils"
import { useCallback, useEffect, useRef, useState } from "react"
import Router from "next/router"
import Header from "../Header"
import Footer from "../Footer"
import SearchPanel from "../search/SearchPanel"
import { List, X } from "react-feather"
import "./Docs.scss"

export default ({ meta, toc, contents }) => {
  const tocRef = useRef()
  const searchResultsRef = useRef()
  const contentRef = useRef()
  const sidebarRef = useRef()
  const sidebarAutoHideTimer = React.useRef(null)
  const [sidebarCollapse, setSidebarCollapse] = useState(false)
  const [hasSearchResults, setHasSearchResults] = useState()

  const enableBodyScrollInternal = () => {
    enableBodyScroll(tocRef.current)
    enableBodyScroll(searchResultsRef.current)
  }

  const disableBodyScrollInternal = () => {
    // Do not disable body scroll if the window has a scrollbar (typically on
    // Windows). Otherwise, the scrollbar will disappear and the content will
    // jump to the right.
    let hasScrollbar = window.innerWidth > document.documentElement.clientWidth
    if (!hasScrollbar) {
      disableBodyScroll(searchResultsRef.current)
      disableBodyScroll(tocRef.current)
    }
  }

  const cancelSidebarAutoHideTimer = useCallback(() => {
    if (sidebarAutoHideTimer.current) {
      clearTimeout(sidebarAutoHideTimer.current)
      sidebarAutoHideTimer.current = null
    }
  }, [])

  const startSidebarAutoHideTimer = useCallback(() => {
    cancelSidebarAutoHideTimer()
    sidebarAutoHideTimer.current = setTimeout(() => {
      setSidebarCollapse(false)
      sidebarAutoHideTimer.current = null
    }, 500)
  }, [cancelSidebarAutoHideTimer])

  const onHashChangeStart = useCallback((url, initial) => {
    enableBodyScrollInternal()
    cancelSidebarAutoHideTimer()
    setSidebarCollapse(false)

    let hash = url.substring(url.indexOf("#") + 1)
    let target = document.getElementById(hash)
    if (!target) {
      return
    }

    // make it so that the search box and the element are vertically centered
    let computedStyle = window.getComputedStyle(target)
    let paddingTop = parseInt(computedStyle.paddingTop)
    let lineHeight = parseInt(computedStyle.lineHeight)
    let sidebarStyle = window.getComputedStyle(sidebarRef.current)
    let sidebarTop = parseInt(sidebarStyle.top)
    let offset = target.offsetTop - sidebarTop +
        paddingTop + (lineHeight / 2 - 20)

    smoothScrollTo(offset, initial ? 200 : 500)
  }, [cancelSidebarAutoHideTimer])

  const onHashChange = useCallback((e) => {
    onHashChangeStart(e.newURL)
  }, [onHashChangeStart])

  const onSidebarMouseEnter = useCallback(() => {
    cancelSidebarAutoHideTimer()
    disableBodyScrollInternal()
  }, [cancelSidebarAutoHideTimer])

  const onSidebarMouseLeave = useCallback(() => {
    enableBodyScrollInternal()
    startSidebarAutoHideTimer()
  }, [startSidebarAutoHideTimer])

  const onContentMouseDown = () => {
    onSidebarMouseLeave()
  }

  const onContentTouchStart = () => {
    onSidebarMouseLeave()
  }

  const onSidebarToggle = () => {
    if (sidebarCollapse) {
      enableBodyScrollInternal()
    } else {
      disableBodyScrollInternal()
    }
    cancelSidebarAutoHideTimer()
    setSidebarCollapse(!sidebarCollapse)
  }

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
    Router.events.on("hashChangeStart", onHashChangeStart)
    window.addEventListener("hashchange", onHashChange)

    let sidebar = sidebarRef.current
    sidebar.addEventListener("mouseenter", onSidebarMouseEnter)
    sidebar.addEventListener("mouseleave", onSidebarMouseLeave)

    replaceInternalLinks(tocRef)
    replaceInternalLinks(contentRef)

    // initial scroll
    onHashChangeStart(window.location.href, true)

    return () => {
      sidebar.removeEventListener("mouseenter", onSidebarMouseEnter)
      sidebar.removeEventListener("mouseleave", onSidebarMouseLeave)
      window.removeEventListener("hashchange", onHashChange)
      Router.events.off("hashChangeStart", onHashChangeStart)
      clearAllBodyScrollLocks()
    }
  }, [onHashChange, onHashChangeStart, onSidebarMouseEnter, onSidebarMouseLeave,
      replaceInternalLinks])

  return (
    <main className="page docs">
      <Header title={meta.title}/>
      <div className="page-content docs-content">
        <div className="container">
          <div className="docs-content-wrapper">
            <aside className={classNames({ "docs-has-search-results": hasSearchResults, "collapse": sidebarCollapse })}>
              <div className="docs-content-wrapper-sidebar" ref={sidebarRef}>
                <SearchPanel contentRef={contentRef} onHasResults={setHasSearchResults} ref={searchResultsRef} />
                <div dangerouslySetInnerHTML={{ __html: toc }} ref={tocRef}
                    className="docs-content-toc" />
              </div>
            </aside>
            <div className={classNames("docs-content-sidebar-toggle", { "collapse": sidebarCollapse })}
                onClick={onSidebarToggle}>
              <div style={{ position: "relative" }}>
                <List className="feather-list" />
                <X className="feather-x" />
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: contents }} ref={contentRef}
                className="docs-content-inner" onMouseDown={onContentMouseDown}
                onTouchStart={onContentTouchStart} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
