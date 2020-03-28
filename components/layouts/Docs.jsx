import classNames from "classnames";
import { useRef, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Search from "../docs/Search";
import "./Docs.scss";
import lunr from "lunr";

export default (props) => {
  const childrenRef = useRef();
  const [index, setIndex] = useState();
  const [searchResults, setSearchResults] = useState();

  const isLetter = (s, i) => !!s.substring(i, i + 1).match(/[a-z]/i);

  const onSearch = (value) => {
    if (!value) {
      setSearchResults(undefined);
      return;
    }

    let ps = childrenRef.current.getElementsByTagName("p");

    let idx = index;
    if (idx === undefined) {
      idx = lunr(function () {
        this.ref("id");
        this.field("p");
        this.metadataWhitelist = ["position"];

        for (let i in ps) {
          let p = ps[i];
          this.add({ id: i, p: p.textContent });
        }
      });
      setIndex(idx);
    }

    let matches = idx.query(query => {
      query.term(lunr.tokenizer(value), {
        wildcard: lunr.Query.wildcard.LEADING,
        usePipeline: true,
        presence: lunr.Query.presence.REQUIRED
      });
    });

    let results = [];
    for (let r of matches.slice(0, 10)) {
      let ref = r.ref;
      let metadata = r.matchData.metadata;
      let text = ps[+ref].textContent;

      let start;
      let end;
      Object.keys(metadata).forEach(term => {
        let position = metadata[term].p.position[0];

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

      results.push(subtext);
    }

    setSearchResults(results);
  };

  let searchResultsList = [];
  if (searchResults) {
    searchResults.forEach((r, i) => {
      searchResultsList.push(<li key={i}>{r}</li>);
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
