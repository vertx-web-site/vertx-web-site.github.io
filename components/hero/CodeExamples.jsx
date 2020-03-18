import "./CodeExamples.scss";
import Java from "./CodeExamplesJava.mdx";
import { useEffect, useRef } from "react";

export default () => {
  let javaRef = useRef();

  useEffect(() => {
    // get code node
    let node = javaRef.current;
    let code = node.getElementsByTagName("code")[0];

    // iterate through all text nodes
    let i = document.createNodeIterator(code, NodeFilter.SHOW_TEXT);
    let child;
    let characters = [];
    while (child = i.nextNode()) {
      if (child.length > 0) {
        // select first character of text node
        let range = document.createRange();
        range.setStart(child, 0);
        range.setEnd(child, 1);

        // wrap character inside two span elements (one for the character and
        // one for the cursor)
        let span = document.createElement("span");
        let outerSpan = document.createElement("span");
        span.style.opacity = 0;
        span.appendChild(range.extractContents());
        outerSpan.appendChild(span);

        range.insertNode(outerSpan);
        i.nextNode(); // skip node just inserted

        characters.push(outerSpan);
      }
    }

    // now that all characters are wrapped and invisible, make the parent visible
    node.style.opacity = 1;

    // make wrapped characters visible one after the other
    let nextChar = () => {
      if (characters.length === 0) {
        return;
      }

      // get next character
      let c = characters.shift();
      c.childNodes[0].style.opacity = 1;
      c.style.borderLeft = "";

      // show cursor on next character
      if (characters.length > 0 && characters[0].innerText !== " ") {
        characters[0].style.borderLeft = "1px solid #fff";
      }

      // calculate delay
      let d;
      if (characters.length > 0 && characters[0].innerText === " ") {
        // no delay for spaces
        d = 0;
      } else {
        d = Math.floor(0 + (Math.random() * 10));
      }

      // "type" next character
      setTimeout(nextChar, d * d / 3);
    };

    // "type" first character
    setTimeout(nextChar, 500);
  }, []);

  return (
    <div className="code-examples">
      <div className="code-examples-tabs">
        <div className="code-examples-tab active">Java</div>
        <div className="code-examples-tab">Kotlin</div>
        <div className="code-examples-tab">Groovy</div>
      </div>
      <div className="code-examples-content" ref={javaRef}>
        <Java />
      </div>
    </div>
  );
};
