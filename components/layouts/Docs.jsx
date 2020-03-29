import classNames from "classnames";
import { smoothScrollTo } from "../lib/scroll-utils";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";
import Header from "../Header";
import Footer from "../Footer";
import SearchPanel from "../search/SearchPanel";
import "./Docs.scss";

export default (props) => {
  const childrenRef = useRef();
  const searchPanelRef = useRef();
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
    let offset = target.offsetTop - searchPanelRef.current.offsetTop +
        paddingTop + (lineHeight / 2 - 20);

    smoothScrollTo(offset, initial ? 200 : 500);
  };

  useEffect(() => {
    Router.events.on("hashChangeStart", onHashChangeStart);
    window.addEventListener("hashchange", onHashChange);

    // replace internal links' onclick with Router.push() so we can scroll smoothly
    let internalLinks = childrenRef.current.querySelectorAll("a[href^='#']");
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

    // initial scroll
    onHashChangeStart(window.location.href, true);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      Router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, []);

  return (
    <main className="page docs">
      <Header title={props.meta.title}/>
      <div className="page-content docs-content">
        <div className="container">
          <SearchPanel ref={searchPanelRef} onHasResults={setHasSearchResults}>
            <div ref={childrenRef} className={classNames({ "docs-has-search-results": hasSearchResults })}>
              {props.children}
            </div>
          </SearchPanel>
        </div>
      </div>
      <Footer />
    </main>
  );
};
