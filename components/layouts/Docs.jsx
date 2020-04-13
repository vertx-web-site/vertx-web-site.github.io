import classNames from "classnames";
import { smoothScrollTo } from "../lib/scroll-utils";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import Header from "../Header";
import Footer from "../Footer";
import SearchPanel from "../search/SearchPanel";
import "./Docs.scss";

export default ({ meta, toc, contents }) => {
  const tocRef = useRef();
  const contentRef = useRef();
  const sidebarRef = useRef();
  const [hasSearchResults, setHasSearchResults] = useState();

  const onHashChange = (e) => {
    onHashChangeStart(e.newURL);
  };

  const onHashChangeStart = (url, initial) => {
    let hash = url.substring(url.indexOf("#") + 1);
    let target = document.getElementById(hash);
    if (!target) {
      return;
    }

    // make it so that the search box and the element are vertically centered
    let computedStyle = window.getComputedStyle(target);
    let paddingTop = parseInt(computedStyle.paddingTop);
    let lineHeight = parseInt(computedStyle.lineHeight);
    let sidebarStyle = window.getComputedStyle(sidebarRef.current);
    let sidebarTop = parseInt(sidebarStyle.top)
    let offset = target.offsetTop - sidebarTop +
        paddingTop + (lineHeight / 2 - 20);

    smoothScrollTo(offset, initial ? 200 : 500);
  };

  // replace internal links' onclick with Router.push() so we can scroll smoothly
  const replaceInternalLinks = (ref) => {
    let internalLinks = ref.current.querySelectorAll("a[href^='#']");
    for (let il of internalLinks) {
      il.onclick = (e) => {
        e.preventDefault();
        let href = window.location.href;
        let hash = href.substring(href.indexOf("#"));
        if (hash !== il.getAttribute("href")) {
          Router.push(window.location.pathname + il.getAttribute("href"));
        } else {
          onHashChangeStart(href);
        }
      };
    }
  };

  useEffect(() => {
    Router.events.on("hashChangeStart", onHashChangeStart);
    window.addEventListener("hashchange", onHashChange);

    replaceInternalLinks(tocRef);
    replaceInternalLinks(contentRef);

    // initial scroll
    onHashChangeStart(window.location.href, true);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      Router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, []);

  return (
    <main className="page docs">
      <Header title={meta.title}/>
      <div className="page-content docs-content">
        <div className="container">
          <div className="docs-content-wrapper">
            <aside className={classNames({ "docs-has-search-results": hasSearchResults })}>
              <div className="docs-content-wrapper-sidebar" ref={sidebarRef}>
                <SearchPanel contentRef={contentRef} onHasResults={setHasSearchResults} />
                <div dangerouslySetInnerHTML={{ __html: toc }} ref={tocRef}
                    className="docs-content-toc" />
              </div>
            </aside>
            <div dangerouslySetInnerHTML={{ __html: contents }} ref={contentRef}
                className="docs-content-inner" />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
