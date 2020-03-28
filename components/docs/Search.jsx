import classNames from "classnames";
import { useState, useRef } from "react";
import { Search, XCircle } from "react-feather";
import "./Search.scss";

export default () => {
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChange = (e) => {
    setContent(e.currentTarget.value);
  };

  return (
    <div className={classNames("docs-search", { "has-content": content !== "" })}>
      <input type="text" placeholder="Search..." value={content} onChange={onChange} />
      <Search className="docs-search-icon" />
      <XCircle className="docs-search-icon-delete" onClick={ () => setContent("") } />
    </div>
  );
};
