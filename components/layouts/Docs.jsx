import classNames from "classnames";
import { smoothScrollTo } from "../lib/scroll-utils";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import Router from "next/router";
import Header from "../Header";
import Footer from "../Footer";
import Search from "../docs/Search";
import "./Docs.scss";
import lunr from "lunr";

function isLetter(s, i) {
  return !!s.substring(i, i + 1).match(/[a-z]/i);
}

function excerpt(str, positions, maxlen) {
  if (str.length <= maxlen) {
    return str;
  }

  // find longest range that does not exceed maxlen
  let start = positions[0][0];
  let i = positions.length;
  while (i > 0) {
    --i;
    if (positions[i][1] - start <= maxlen) {
      break;
    }
  }
  let end = positions[i][1];

  if (end - start >= maxlen) {
    return str.substring(start, end);
  }

  let rest = maxlen - (end - start);

  let newstart = start - Math.ceil(rest / 2);
  let newend = end + Math.floor(rest / 2);
  if (newstart < 0) {
    newstart = 0;
    newend = maxlen;
  } else if (newend > str.length) {
    newend = str.length;
    newstart = str.length - maxlen;
  }
  newstart = Math.max(0, newstart);
  newend = Math.min(str.length, newend);

  // trim right word
  if (newend < str.length) {
    while (newend > end && isLetter(str, newend)) {
      --newend;
      if (newstart > 0) {
        --newstart;
      }
    }
  }

  // trim left word
  if (newstart > 0) {
    while (newstart < start && isLetter(str, newstart - 1)) {
      ++newstart;
    }
  }

  return [newstart, newend];
}

function highlight(str, positions) {
  let lastend = 0;
  let tokens = [];
  for (let i in positions) {
    let p = positions[i];
    if (p[0] > lastend) {
      tokens.push(str.substring(lastend, p[0]));
    }
    tokens.push(
      <span key={i} className="docs-content-search-results-highlight">
        {str.substring(p[0], p[1])}
      </span>
    );
    lastend = p[1];
  }
  if (lastend < str.length) {
    tokens.push(str.substring(lastend, str.length));
  }
  return <span>{tokens}</span>;
}

export default (props) => {
  const childrenRef = useRef();
  const searchRef = useRef();
  const metadata = useRef();
  const index = useRef();
  const [searchResults, setSearchResults] = useState();

  const ensureMetadata = () => {
    if (metadata.current) {
      return;
    }

    metadata.current = {};

    for (let depth = 1; depth < 4; ++depth) {
      let sects = childrenRef.current.querySelectorAll(".sect" + depth);
      for (let sect of sects) {
        let id;
        let title;
        let content = [];
        let allchildren = [];
        for (let c of sect.children) {
          allchildren.push(c);
        }

        while (allchildren.length > 0) {
          let c = allchildren.shift();
          if (c.nodeName.match(/h[1-9]/i)) {
            title = c.textContent;
            id = c.id;
          } else if (c.className === "sectionbody") {
            for (let bodyc of c.children) {
              allchildren.push(bodyc);
            }
          } else if (c.className === "paragraph" || c.className === "ulist") {
            content.push(c.textContent);
          } else if (c.className && c.className.indexOf("admonitionblock") >= 0) {
            let abc = c.querySelector(".content");
            if (abc) {
              content.push(abc.textContent);
            }
          }
        }
        if (id && title && content.length > 0) {
          metadata.current[id] = {
            id,
            title,
            content: content.join(" ")
          };
        }
      }
    }
  };

  const ensureIndex = () => {
    if (index.current) {
      return;
    }

    ensureMetadata();

    index.current = lunr(function () {
      this.ref("id");
      this.field("title", { boost: 10 });
      this.field("content");
      this.metadataWhitelist = ["position"];

      for (let m of Object.keys(metadata.current)) {
        this.add(metadata.current[m]);
      }
    });
  };

  const onSearch = (value) => {
    if (!value) {
      setSearchResults(undefined);
      return;
    }

    ensureIndex();

    let matches;
    try {
      matches = index.current.search(value).sort((a, b) => b.score - a.score);
    } catch (e) {
      matches = [];
    }

    let results = [];
    for (let r of matches.slice(0, 10)) {
      let ref = r.ref;
      let current = metadata.current[ref];
      let id = current.id;
      let title = current.title;
      let text = current.content;

      // TODO add all positions
      let firstKey = Object.keys(r.matchData.metadata)[0];
      let content = r.matchData.metadata[firstKey].content || r.matchData.metadata[firstKey].title;
      let positions = [[content.position[0][0], content.position[0][0] + content.position[0][1]]];
      let [start, end] = excerpt(text, positions, 100)

      let subtext = text.substring(start, end);
      if (start > 0) {
        subtext = "... " + subtext;
      }
      if (end < text.length) {
        subtext += " ...";
      }

      if (start > 0) {
        positions[0][0] -= start - 4;
        positions[0][1] -= start - 4;
      }
      let result = highlight(subtext, positions);

      results.push({
        id,
        title,
        result
      });
    }

    setSearchResults(results);
  };

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
    let offset = target.offsetTop - searchRef.current.offsetTop + paddingTop +
        (lineHeight / 2 - searchRef.current.clientHeight / 2);

    smoothScrollTo(offset, initial ? 1 : 500);
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

  let searchResultsList = [];
  if (searchResults) {
    searchResults.forEach(r => {
      searchResultsList.push(
        <li key={r.id} onClick={() => Router.push(`${window.location.pathname}#${r.id}`)}>
          <h5>{r.title}</h5>{r.result}
        </li>
      );
    });
  }

  return (
    <main className="page docs">
      <Header title={props.meta.title}/>
      <div className={classNames("page-content", "docs-content", { "has-search-results": !!searchResults })}>
        <div className="container">
          <Search onChange={onSearch} ref={searchRef} />
          <div ref={childrenRef}>
            {props.children}
          </div>
          {
            (searchResults && searchResults.length > 0) ? (
              <ul className="docs-content-search-results">
                {searchResultsList}
              </ul>
            ) : (
              <div className="docs-content-no-search-results">No results.</div>
            )
          }
        </div>
      </div>
      <Footer />
    </main>
  );
};
