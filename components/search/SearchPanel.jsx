import { forwardRef, useRef, useState } from "react"
import Router from "next/router"
import SearchBox from "./SearchBox"
import SearchResults from "./SearchResults"
import lunr from "lunr"
import "./SearchPanel.scss"

const MAX_EXCERPT_LENGTH = 100

function pushRouter(id) {
  let href = window.location.href
  let hash = href.substring(href.indexOf("#") + 1)
  if (hash !== id) {
    Router.push(`${window.location.pathname}#${id}`)
  }
}

// check if the character at position i is a letter
function isLetter(str, i) {
  return !!str.substring(i, i + 1).match(/[a-z]/i)
}

// create an excerpt from str with a maximum length of maxlen around the
// given word positions
function excerpt(str, positions, maxlen) {
  if (str.length <= maxlen) {
    return [0, str.length]
  }

  // find longest range that does not exceed maxlen
  let start = positions[0][0]
  let i = positions.length
  while (i > 0) {
    --i
    if (positions[i][1] - start <= maxlen) {
      break
    }
  }
  let end = positions[i][1]

  if (end - start >= maxlen) {
    return [start, end]
  }

  // skip forward and backward
  let rest = maxlen - (end - start)
  let newstart = start - Math.ceil(rest / 2)
  let newend = end + Math.floor(rest / 2)
  if (newstart < 0) {
    newstart = 0
    newend = maxlen
  } else if (newend > str.length) {
    newend = str.length
    newstart = str.length - maxlen
  }
  newstart = Math.max(0, newstart)
  newend = Math.min(str.length, newend)

  // trim right word
  if (newend < str.length) {
    while (newend > end && isLetter(str, newend)) {
      --newend
      if (newstart > 0) {
        --newstart
      }
    }
  }

  // trim left word
  if (newstart > 0) {
    while (newstart < start && isLetter(str, newstart - 1)) {
      ++newstart
    }
  }

  return [newstart, newend]
}

// create a React element from the given string and insert <span> elements
// that highlight the words at the given positions
function highlight(str, positions) {
  let lastend = 0
  let tokens = []
  for (let i in positions) {
    let p = positions[i]
    if (p[0] > lastend) {
      tokens.push(str.substring(lastend, p[0]))
    }
    tokens.push(
      <span key={i} className="search-results-highlight">
        {str.substring(p[0], p[1])}
      </span>
    )
    lastend = p[1]
  }
  if (lastend < str.length) {
    tokens.push(str.substring(lastend, str.length))
  }
  return <span>{tokens}</span>
}

// extract all positions from all Lunr search results
function extractPositions(metadata, attr) {
  let result = []
  Object.keys(metadata).forEach(k => {
    if (metadata[k][attr]) {
      for (let p of metadata[k][attr].position) {
        result.push(p)
      }
    }
  })
  return result
}

// coalesce the given positions (i.e. recursively merge overlapping ranges)
function coalescePositions(positions) {
  let result = []
  let anymerged = false
  for (let p of positions) {
    let merged = false
    for (let r of result) {
      if ((p[0] >= r[0] && p[0] <= r[1]) || (p[1] >= r[0] && p[1] <= r[1])) {
        r[0] = Math.min(r[0], p[0])
        r[1] = Math.max(r[1], p[1])
        merged = true
        anymerged = true
        break
      }
    }
    if (!merged) {
      result.push(p)
    }
  }
  if (anymerged) {
    return coalescePositions(result)
  }
  return result
}

// sort the given positions according to their start
function sortPositions(positions) {
  positions.sort((a, b) => a[0] - b[0])
  return positions
}

// normalize Lunr positions:
// * converting them to proper ranges
// * coalesce and sort them
function normalizePositions(positions) {
  let result = []
  for (let p of positions) {
    result.push([p[0], p[0] + p[1]])
  }
  return sortPositions(coalescePositions(result))
}

const SearchPanel = forwardRef(({ contentRef, onHasResults }, ref) => {
  const metadata = useRef()
  const index = useRef()
  const [searchResults, setSearchResults] = useState()
  const [activeResultId, setActiveResultId] = useState()

  // Iterate through all sections on the current page and extract the contents.
  // Save the contents in the `metadata' ref.
  const ensureMetadata = () => {
    if (metadata.current) {
      return
    }

    metadata.current = {}

    // find all sections in level 1 to 4
    for (let depth = 1; depth < 4; ++depth) {
      let sects = contentRef.current.querySelectorAll(".sect" + depth)

      // iterate through all sections and collect contents
      for (let sect of sects) {
        let id
        let title
        let content = []
        let allchildren = []
        for (let c of sect.children) {
          allchildren.push(c)
        }

        // recursively iterate through all children of the section
        while (allchildren.length > 0) {
          let c = allchildren.shift()
          if (c.nodeName.match(/h[1-9]/i)) {
            // collect section titles
            title = c.textContent
            id = c.id
          } else if (c.className === "sectionbody") {
            // iterate through all children too
            for (let bodyc of c.children) {
              allchildren.push(bodyc)
            }
          } else if (c.className === "paragraph" || c.className === "ulist") {
            // collect section contents
            content.push(c.textContent)
          } else if (c.className && c.className.indexOf("admonitionblock") >= 0) {
            // also collect contents of adminition blocks
            let abc = c.querySelector(".content")
            if (abc) {
              content.push(abc.textContent)
            }
          }
        }

        // save collected information in metadata object
        if (id && title && content.length > 0) {
          metadata.current[id] = {
            id,
            title,
            content: content.join(" ")
          }
        }
      }
    }
  }

  // use the metadata collected in `ensureMetadata' and create a Lunr index
  const ensureIndex = () => {
    if (index.current) {
      return
    }

    ensureMetadata()

    index.current = lunr(function () {
      this.ref("id")
      this.field("title", { boost: 10 })
      this.field("content")
      this.metadataWhitelist = ["position"]

      for (let m of Object.keys(metadata.current)) {
        this.add(metadata.current[m])
      }
    })
  }

  // set the current search results
  const doSetSearchResults = (results) => {
    setSearchResults(results)

    if (results && results.length > 0) {
      setActiveResultId(results[0].id)
    } else {
      setActiveResultId(undefined)
    }

    if (onHasResults) {
      onHasResults(!!results)
    }
  }

  // perform a search
  const onSearch = (value) => {
    if (!value) {
      doSetSearchResults(undefined)
      return
    }

    // make sure the index is ready
    ensureIndex()

    // query the index
    let matches
    try {
      matches = index.current.search(value).sort((a, b) => b.score - a.score)
    } catch (e) {
      matches = []
    }

    // iterate through all results from the index and convert them to
    // results we can display
    let results = []
    for (let r of matches.slice(0, 10)) {
      let ref = r.ref
      let current = metadata.current[ref]
      let id = current.id
      let title = current.title
      let text = current.content

      // highlight matched token in the title
      let titlePositions = normalizePositions(extractPositions(r.matchData.metadata, "title"))
      if (titlePositions.length > 0) {
        title = highlight(title, titlePositions)
      }

      // create an excerpt from the matched section contents and highlight
      // matched tokens
      let result
      let contentPositions = normalizePositions(extractPositions(r.matchData.metadata, "content"))
      if (contentPositions.length > 0) {
        // create excerpt
        let [start, end] = excerpt(text, contentPositions, MAX_EXCERPT_LENGTH)

        let subtext = text.substring(start, end)
        if (start > 0) {
          subtext = "... " + subtext
        }
        if (end < text.length) {
          subtext += " ..."
        }

        // highlight matched tokens
        if (start > 0) {
          for (let p of contentPositions) {
            p[0] -= start - 4
            p[1] -= start - 4
          }
        }
        result = highlight(subtext, contentPositions)
      } else {
        // There were no matches in the contents. Just create the excerpt.
        let positions = [[0, Math.min(MAX_EXCERPT_LENGTH, text.length)]]
        let [start, end] = excerpt(text, positions, MAX_EXCERPT_LENGTH)
        result = text.substring(start, end)
      }

      results.push({
        id,
        title,
        result
      })
    }

    doSetSearchResults(results)
  }

  const onResultHover = (id) => {
    setActiveResultId(id)
  }

  // Go to currently selected search result
  const onSubmit = () => {
    if (typeof activeResultId !== "undefined") {
      pushRouter(activeResultId)
    }
  }

  // Select next search result in the list
  const onNextSearchResult = () => {
    if (!searchResults || !activeResultId) {
      return
    }
    let i = searchResults.findIndex(r => r.id === activeResultId)
    i++
    if (i >= searchResults.length) {
      i -= searchResults.length
    }
    setActiveResultId(searchResults[i].id)
  }

  // Select previous search result in the list
  const onPrevSearchResult = () => {
    if (!searchResults || !activeResultId) {
      return
    }
    let i = searchResults.findIndex(r => r.id === activeResultId)
    i--
    if (i < 0) {
      i = searchResults.length - 1
    }
    setActiveResultId(searchResults[i].id)
  }

  return (
    <>
      <div className="search-panel">
        <SearchBox onChange={onSearch} onSubmit={onSubmit}
          onNext={onNextSearchResult} onPrev={onPrevSearchResult} />
        <SearchResults results={searchResults} activeId={activeResultId}
          onHover={onResultHover} onClick={(id) => pushRouter(id)} ref={ref} />
      </div>
    </>
  )
})

export default SearchPanel
