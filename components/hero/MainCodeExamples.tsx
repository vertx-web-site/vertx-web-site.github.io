"use client"

import CodeExamples, { CodeExample } from "../CodeExamples"
import Java from "./MainCodeExamplesJava.mdx"
import Kotlin from "./MainCodeExamplesKotlin.mdx"
import { useEffect, useRef } from "react"

const MainCodeExamples = () => {
  const javaRef = useRef<HTMLDivElement>(null)
  const animationStarted = useRef(false)

  useEffect(() => {
    let j = javaRef.current
    if (j === null) {
      return
    }

    if (animationStarted.current) {
      return
    }
    animationStarted.current = true

    // get code node
    let lines = j.querySelectorAll("[data-line]")

    // iterate through all text nodes
    let characters: HTMLSpanElement[] = []
    lines.forEach(line => {
      let i = document.createNodeIterator(line, NodeFilter.SHOW_TEXT)
      let child = i.nextNode()
      while (child) {
        if (child.nodeType === Node.TEXT_NODE && (child as Text).length > 0) {
          // select first character of text node
          let range = document.createRange()
          range.setStart(child, 0)
          range.setEnd(child, 1)

          // wrap character inside two span elements (one for the character and
          // one for the cursor)
          let span = document.createElement("span")
          let outerSpan = document.createElement("span")
          span.style.opacity = "0"
          span.appendChild(range.extractContents())
          outerSpan.appendChild(span)

          range.insertNode(outerSpan)
          i.nextNode() // skip node just inserted

          characters.push(outerSpan)
        }
        child = i.nextNode()
      }
    })

    // now that all characters are wrapped and invisible, make the parent visible
    j.style.opacity = "1"

    // make wrapped characters visible one after the other
    let nextChar = () => {
      // get next character
      let c = characters.shift()
      if (c === undefined) {
        return
      }
      let firstChild = c.childNodes[0] as HTMLSpanElement
      firstChild.style.opacity = "1"
      c.style.borderLeft = ""

      // show cursor on next character
      if (characters.length > 0 && characters[0].innerText !== " ") {
        characters[0].style.borderLeft = "1px solid #fff"
      }

      // calculate delay
      let d
      if (characters.length > 0 && characters[0].innerText === " ") {
        // no delay for spaces
        d = 0
      } else {
        d = Math.floor(0 + Math.random() * 10)
        if (Math.random() > 0.9) {
          d += 10
        }
      }

      // "type" next character
      setTimeout(nextChar, (d * d) / 3)
    }

    // "type" first character
    setTimeout(nextChar, 500)
  }, [])

  return (
    <div className="main-code-examples">
      <CodeExamples smallText shadow>
        <CodeExample title="Java">
          <div ref={javaRef} className="opacity-0">
            <Java />
          </div>
        </CodeExample>
        <CodeExample title="Kotlin">
          <Kotlin />
        </CodeExample>
      </CodeExamples>
    </div>
  )
}

export default MainCodeExamples
