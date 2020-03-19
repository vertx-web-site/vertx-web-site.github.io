import "./CodeExamples.scss";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import Java from "./CodeExamplesJava.mdx";
import Kotlin from "./CodeExamplesKotlin.mdx";
import Groovy from "./CodeExamplesGroovy.mdx";

export default () => {
  const javaRef = useRef();
  const [active, setActive] = useState("java");

  useEffect(() => {
    // get code node
    let code = javaRef.current.getElementsByTagName("code")[0];

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
    javaRef.current.style.opacity = 1;

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
        if (Math.random() > 0.9) {
          d += 10;
        }
      }

      // "type" next character
      setTimeout(nextChar, d * d / 3);
    };

    // "type" first character
    setTimeout(nextChar, 500);
  }, []);

  const activeClassName = lang => ({ active: active === lang });
  const tabClassNameJava = classNames("code-examples-tab", activeClassName("java"));
  const tabClassNameKotlin = classNames("code-examples-tab", activeClassName("kotlin"));
  const tabClassNameGroovy = classNames("code-examples-tab", activeClassName("groovy"));
  const exampleClassNameJava = classNames("code-examples-example", activeClassName("java"))
  const exampleClassNameKotlin = classNames("code-examples-example", activeClassName("kotlin"))
  const exampleClassNameGroovy = classNames("code-examples-example", activeClassName("groovy"))

  return (
    <div className="code-examples">
      <div className="code-examples-tabs">
        <div className={tabClassNameJava} onClick={() => setActive("java")}>Java</div>
        <div className={tabClassNameKotlin} onClick={() => setActive("kotlin")}>Kotlin</div>
        <div className={tabClassNameGroovy} onClick={() => setActive("groovy")}>Groovy</div>
      </div>
      <div className="code-examples-content">
        <div className={exampleClassNameJava} ref={javaRef}>
          <Java />
        </div>
        <div className={exampleClassNameKotlin}>
          <Kotlin />
        </div>
        <div className={exampleClassNameGroovy}>
          <Groovy />
        </div>
      </div>
    </div>
  );
};
