import { makeIndex } from "../docs/Toc"
import { useVersion } from "../hooks/useVersion"
import type { SearchResult } from "./SearchResult"
import { latestRelease } from "@/docs/metadata/all"
import { CaretLeft } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import Link from "next/link"
import { forwardRef } from "react"

interface SearchResultListItemProps {
  item: SearchResult
  active: boolean
  tocIndex: ReturnType<typeof makeIndex>
  onFocus: () => void
  onClose: () => void
  onMouseMove: () => void
}

const SearchResultListItem = forwardRef<
  HTMLAnchorElement,
  SearchResultListItemProps
>(({ item, active, onFocus, onClose, onMouseMove, tocIndex }, ref) => {
  const { version } = useVersion()

  let slug = item.slug
  if (slug === "get-started") {
    slug = ""
  }

  let context
  let idxentry = tocIndex[slug]
  if (idxentry.type === "page") {
    context = idxentry.chapter
  } else if (idxentry.type === "section" || idxentry.type === "subsection") {
    context = idxentry.page
  }
  let contextTitle
  if (context !== undefined) {
    contextTitle = tocIndex[context].title
  }

  let slugWithVersion
  if (version !== latestRelease.version) {
    if (slug !== "") {
      slugWithVersion = `${version}/${slug}`
    } else {
      slugWithVersion = version
    }
  } else {
    slugWithVersion = slug
  }

  return (
    <Link
      href={`/docs/${slugWithVersion}`}
      ref={ref}
      onFocus={onFocus}
      onClick={() => onClose()}
      onMouseMove={onMouseMove}
    >
      <div
        className={clsx("rounded-md px-4 py-4", {
          "active group bg-primary text-bg dark:bg-primary/60 dark:text-gray-900":
            active,
          "bg-gray-100 dark:bg-gray-200": !active,
        })}
      >
        <div className="mb-2 flex flex-row items-baseline gap-1">
          <div className="font-normal">{item.title}</div>
          {contextTitle !== undefined ? (
            <>
              <div className="flex flex-row items-baseline gap-1 whitespace-nowrap text-xs text-gray-600 group-[.active]:text-gray-400">
                <CaretLeft size=".75em" /> {contextTitle}
              </div>
            </>
          ) : undefined}
        </div>
        <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-relaxed">
          {item.body}
        </div>
      </div>
    </Link>
  )
})

export default SearchResultListItem
