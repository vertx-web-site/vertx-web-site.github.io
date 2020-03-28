import classNames from "classnames";
import { useRef, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Search from "../docs/Search";
import "./Docs.scss";
import lunr from "lunr";

export default (props) => {
  const childrenRef = useRef();
  const metadata = useRef();
  const index = useRef();
  const [searchResults, setSearchResults] = useState();

  const isLetter = (s, i) => !!s.substring(i, i + 1).match(/[a-z]/i);

  const ensureMetadata = () => {
    if (metadata.current) {
      return;
    }

    let i = 0;
    metadata.current = [];

    for (let depth = 1; depth < 4; ++depth) {
      let sects = childrenRef.current.querySelectorAll(".sect" + depth);
      for (let sect of sects) {
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
        if (title && content.length > 0) {
          metadata.current.push({
            id: i,
            title,
            content: content.join(" ")
          });
          ++i;
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

      for (let m of metadata.current) {
        this.add(m);
      }
    });
  };

  const onSearch = (value) => {
    if (!value) {
      setSearchResults(undefined);
      return;
    }

    ensureIndex();

    let matches = index.current.search(value).sort((a, b) => b.score - a.score);

    let results = [];
    for (let r of matches.slice(0, 10)) {
      let ref = r.ref;
      let current = metadata.current[+ref];
      let title = current.title;
      let text = current.content;

      let start;
      let end;
      Object.keys(r.matchData.metadata).forEach(term => {
        let content = r.matchData.metadata[term].content || r.matchData.metadata[term].title;
        let position = content.position[0];

        let maxlen = 100;
        if (position[0] + position[1] < maxlen) {
          start = 0;
          end = Math.min(maxlen, text.length);
        } else if (position[0] + maxlen > text.length) {
          start = Math.max(0, text.length - maxlen);
          end = text.length;
        } else {
          start = position[0] - maxlen;
          end = start + maxlen;
        }
      });

      let subtext = text.substring(start, end);
      if (start > 0) {
        if (isLetter(text, start - 1)) {
          let i = 0;
          while (i < subtext.length && isLetter(subtext, i)) ++i;
          subtext = subtext.substring(i);
        }
      }

      if (end < text.length) {
        if (isLetter(text, end)) {
          let i = subtext.length - 1;
          while (i >= 0 && isLetter(subtext, i)) --i;
          subtext = subtext.substring(0, i + 1);
        }
      }

      if (start > 0) {
        let i = 0;
        while (i < subtext.length && !isLetter(subtext, i)) ++i;
        subtext = "... " + subtext.substring(i);
      }
      if (end < text.length) {
        let i = subtext.length - 1;
        while (i >= 0 && !isLetter(subtext, i)) --i;
        subtext = subtext.substring(0, i + 1) + " ...";
      }

      results.push({
        title,
        text: subtext
      });
    }

    setSearchResults(results);
  };

  let searchResultsList = [];
  if (searchResults) {
    searchResults.forEach((r, i) => {
      searchResultsList.push(<li key={i}><h5>{r.title}</h5>{r.text}</li>);
    });
  }

  return (
    <main className="page docs">
      <Header title={props.meta.title}/>
      <div className={classNames("page-content", "docs-content", { "has-search-results": !!searchResults })}>
        <div className="container">
          <Search onChange={onSearch} />
          <div ref={childrenRef}>
            {props.children}
          </div>
          <ul className="docs-content-search-results">
            {searchResultsList}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
};
