"use client"

import { useEffect, useRef } from "react"

interface GistProps {
  url: string
}

const Gist = ({ url }: GistProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current === null) {
      return
    }

    let iframe = document.createElement("iframe")
    iframe.style.width = "100%"
    ref.current.appendChild(iframe)
    iframe.srcdoc = `<html>
      <head>
      <style>
        body {
          margin: 0;
          overflow: hidden;
        }
      </style>
      </head>
      <body>
        <script src="${url}.js" type="text/javascript"></script>
      </body>
    </html>`

    iframe.addEventListener("load", function () {
      let height = iframe.contentDocument?.body?.scrollHeight
      iframe.style.height = `${height}px`
    })

    return () => {
      iframe.remove()
    }
  }, [url])

  return <div ref={ref}></div>
}

export default Gist
