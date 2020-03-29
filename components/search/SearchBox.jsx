import classNames from "classnames";
import { useState, useRef } from "react";
import { Search, XCircle } from "react-feather";
import "./SearchBox.scss";
import debounce from "lodash.debounce";

export default ({ onChange }) => {
  const [content, setContent] = useState("");
  const debounceOnChange = useRef(onChange ? debounce(onChange, 300) : undefined);
  const inputRef = useRef();

  const doSetContent = (value) => {
    setContent(value);
    if (!value) {
      if (onChange) {
        onChange(value);
        debounceOnChange.current(value);
      }
    } else {
      if (debounceOnChange.current) {
        debounceOnChange.current(value);
      }
    }
  };

  const internalOnChange = (e) => {
    doSetContent(e.currentTarget.value);
  };

  const onDelete = () => {
    doSetContent("");
    inputRef.current.focus();
  };

  return (
    <div className={classNames("search", { "has-content": content !== "" })}>
      <input type="text" placeholder="Search..." value={content} onChange={internalOnChange} ref={inputRef} />
      <Search className="search-icon" />
      <XCircle className="search-icon-delete" onClick={ () => onDelete() } />
    </div>
  );
};
