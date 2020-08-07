import classNames from "classnames"
import "./Pagination.scss"
import Link from "next/link"

function makePages(curPage, numPages) {
  let pagemin = curPage - 2
  let pagemax = curPage + 3

  if (pagemin < 0) {
    pagemin = 0
    pagemax = 5
  }
  if (pagemax > numPages) {
    pagemax = numPages
    pagemin = Math.max(0, numPages - 5)
  }

  let pages = []
  for (let i = pagemin; i < pagemax; ++i) {
    pages.push(i + 1)
  }

  if (pages[0] > 2) {
    pages.unshift({ text: "…", id: "left-hellip" })
  }
  if (pages[pages.length - 1] < numPages - 1) {
    pages.push({ text: "…", id: "right-hellip" })
  }
  if (pages[0] !== 1) {
    pages.unshift(1)
  }
  if (pages[pages.length - 1] !== numPages) {
    pages.push(numPages)
  }

  return pages
}

function makeHref(page, category) {
  if (page === 1 && category === undefined) {
    return "/blog/"
  }
  return "/blog/[...slug]"
}

function makeAs(page, category) {
  let path = "/blog/"
  if (category !== undefined) {
    path += `category/${category}/`
  }
  if (page === 1) {
    return path
  }
  return `${path}page/${page}/`
}

const Pagination = ({ currentPage = 1, numPages = 1, category }) => {
  if (numPages <= 1) {
    return <></>
  }

  let pages = makePages(currentPage, numPages)
  pages = pages.map(p => {
    let active = p === currentPage
    let key = p.id || p
    let text = p.text || p
    if (Number.isInteger(text)) {
      return (
        <div className={classNames("pagination-page", { active })} key={key}>
          <Link href={makeHref(p, category)} as={makeAs(p, category)}>
            <a>{text}</a>
          </Link>
        </div>
      )
    } else {
      return (
        <div className="pagination-page disabled" key={key}>{text}</div>
      )
    }
  })

  if (currentPage > 1) {
    pages.unshift(
      <div className="pagination-page" key="prev-page">
        <Link href={makeHref(currentPage - 1, category)} as={makeAs(currentPage - 1, category)}>
          <a>&laquo;</a>
        </Link>
      </div>
    )
  } else {
    pages.unshift(
      <div className="pagination-page disabled" key="prev-page">
        &laquo;
      </div>
    )
  }

  if (currentPage < numPages) {
    pages.push(
      <div className="pagination-page" key="next-page">
        <Link href={makeHref(currentPage + 1, category)} as={makeAs(currentPage + 1, category)}>
          <a>&raquo;</a>
        </Link>
      </div>
    )
  } else {
    pages.push(
      <div className="pagination-page disabled" key="next-page">
        &raquo;
      </div>
    )
  }

  return (
    <div className="pagination">
      {pages}
    </div>
  )
}

export default Pagination
