import classNames from "classnames";
import Router from "next/router";
import { useEffect, useRef } from "react";
import "./SearchResults.scss";

export default ({ results, activeId, onHover, onClick }) => {
  let resultsRef = useRef();

  let resultsList = [];
  if (results) {
    results.forEach(r => {
      resultsList.push(
        <li key={r.id} onClick={() => { if (onClick) onClick(r.id) }}
            className={classNames({ "active": r.id === activeId })}
            onMouseEnter={() => { if (onHover) onHover(r.id) }}>
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
        if (elemTop + activeElement.clientHeight > scrollEnd) {
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
