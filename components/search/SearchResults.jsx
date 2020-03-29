import classNames from "classnames";
import Router from "next/router";
import { useEffect, useRef } from "react";
import "./SearchResults.scss";

function pushRouter(id) {
  let href = window.location.href;
  let hash = href.substring(href.indexOf("#") + 1);
  if (hash !== id) {
    Router.push(`${window.location.pathname}#${id}`);
  }
}

export default ({ results, activeId, onHover }) => {
  let resultsRef = useRef();

  let resultsList = [];
  if (results) {
    results.forEach(r => {
      resultsList.push(
        <li key={r.id} onClick={() => pushRouter(r.id)}
            className={classNames({ "active": r.id === activeId })}
            onMouseEnter={() => { if (onHover) onHover(r.id)}}>
          <h5>{r.title}</h5>{r.result}
        </li>
      );
    });
  }

  useEffect(() => {
    let cur = resultsRef.current;
    if (cur) {
      let activeElement = cur.querySelector(".active");
      if (activeElement) {
        let elemTop = activeElement.offsetTop - cur.offsetTop;
        let scrollEnd = cur.scrollTop + cur.clientHeight;
        if (elemTop > scrollEnd) {
          cur.scrollTop = elemTop + activeElement.clientHeight - cur.clientHeight;
        } else if (elemTop < cur.scrollTop) {
          cur.scrollTop = elemTop;
        }
      }
    }
  }, [activeId]);

  if (!results) {
    return <></>;
  } else {
    return results.length > 0 ? (
      <ul className="search-results" ref={resultsRef}>
        {resultsList}
      </ul>
    ) : (
      <div className="search-results-none">No results.</div>
    );
  }
};
