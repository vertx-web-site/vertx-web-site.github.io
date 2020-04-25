import classNames from "classnames"
import { useEffect } from "react"
import "./SearchResults.scss"

export default React.forwardRef(({ results, activeId, onHover, onClick }, ref) => {
  let resultsList = []
  if (results) {
    results.forEach(r => {
      resultsList.push(
        <li key={r.id} onClick={() => { if (onClick) onClick(r.id) }}
            className={classNames({ "active": r.id === activeId })}
            onMouseEnter={() => { if (onHover) onHover(r.id) }}>
          <h5>{r.title}</h5>{r.result}
        </li>
      )
    })
  }

  useEffect(() => {
    let cur = ref.current
    if (cur) {
      let activeElement = cur.querySelector(".active")
      if (activeElement) {
        let elemTop = activeElement.offsetTop - cur.offsetTop
        let scrollEnd = cur.scrollTop + cur.clientHeight
        if (elemTop + activeElement.clientHeight > scrollEnd) {
          cur.scrollTop = elemTop + activeElement.clientHeight - cur.clientHeight
        } else if (elemTop < cur.scrollTop) {
          cur.scrollTop = elemTop
        }
      }
    }
  }, [activeId, ref])

  // Elements must always exist because we hold a ref. Just make them
  // invisible depending on the current state.
  return (<>
    <ul className={classNames("search-results", { visible: results && results.length > 0 })} ref={ref}>
      {resultsList}
    </ul>
    <div className={classNames("search-results-none", { visible: results && results.length === 0 })}>
      No results.
    </div>
  </>)
})
