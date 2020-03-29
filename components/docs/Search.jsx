import classNames from "classnames";
import { useState, useRef } from "react";
import { Search, XCircle } from "react-feather";
import "./Search.scss";
import debounce from "lodash.debounce";

export default React.forwardRef(({ onChange }, ref) => {
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
    <div className={classNames("docs-search", { "has-content": content !== "" })} ref={ref}>
      <input type="text" placeholder="Search..." value={content} onChange={internalOnChange} ref={inputRef} />
      <Search className="docs-search-icon" />
      <XCircle className="docs-search-icon-delete" onClick={ () => onDelete() } />
    </div>
  );
});
