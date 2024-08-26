import PageLink from "./PageLink"
import { isNumber } from "lodash"

function makePages(
  page: number,
  totalPages: number,
): (number | { key: string; text: string })[] {
  let pagemin = page - 2
  let pagemax = page + 3

  if (pagemin < 0) {
    pagemin = 0
    pagemax = 5
  }
  if (pagemax > totalPages) {
    pagemax = totalPages
    pagemin = Math.max(0, totalPages - 5)
  }

  let pages: (number | { key: string; text: string })[] = []
  for (let i = pagemin; i < pagemax; ++i) {
    pages.push(i + 1)
  }

  let first = pages[0]
  if (isNumber(first) && first > 2) {
    pages.unshift({ key: "left-hellip", text: "…" })
  }
  let last = pages[pages.length - 1]
  if (isNumber(last) && last < totalPages - 1) {
    pages.push({ key: "right-hellip", text: "…" })
  }

  if (pages[0] !== 1) {
    pages.unshift(1)
  }
  if (pages[pages.length - 1] !== totalPages) {
    pages.push(totalPages)
  }

  return pages
}

interface PaginationProps {
  page: number
  totalPages: number
  category: string | undefined
}

const Pagination = ({ page, totalPages, category }: PaginationProps) => {
  let pages = makePages(page, totalPages)
  let pagination = pages.map(p => {
    if (typeof p === "object") {
      return (
        <PageLink key={p.key} disabled={true} category={category}>
          {p.text}
        </PageLink>
      )
    } else {
      return (
        <PageLink key={p} page={p} active={p === page} category={category}>
          {p}
        </PageLink>
      )
    }
  })

  if (page > 1) {
    pagination.unshift(
      <PageLink key="prev-page" page={page - 1} category={category}>
        &lsaquo;
      </PageLink>,
    )
  } else {
    pagination.unshift(
      <PageLink key="prev-page" disabled={true} category={category}>
        &lsaquo;
      </PageLink>,
    )
  }

  if (page < totalPages) {
    pagination.push(
      <PageLink key="next-page" page={page + 1} category={category}>
        &rsaquo;
      </PageLink>,
    )
  } else {
    pagination.push(
      <PageLink key="next-page" disabled={true} category={category}>
        &rsaquo;
      </PageLink>,
    )
  }

  return <div className="flex gap-1">{pagination}</div>
}

export default Pagination
