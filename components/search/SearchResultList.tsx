import { makeIndex } from "../docs/Toc"
import type { SearchResult } from "./SearchResult"
import SearchResultListItem from "./SearchResultListItem"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

export interface SearchResultListRef {
  click: () => void
}

interface SearchResultListProps {
  searchResults: SearchResult[]
  searchInput: string
  selectedItem: number
  setSelectedItem: (index: number) => void
  isFavorites: boolean
  tocIndex: ReturnType<typeof makeIndex>
  onClose: () => void
}

const SearchResultList = forwardRef<SearchResultListRef, SearchResultListProps>(
  (
    {
      searchResults,
      searchInput,
      selectedItem,
      setSelectedItem,
      isFavorites,
      tocIndex,
      onClose,
    },
    ref,
  ) => {
    const listRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
    const itemUnderMouse = useRef<HTMLAnchorElement | null>(null)

    useImperativeHandle(ref, () => {
      return {
        click: () => {
          if (selectedItem < 0 || selectedItem >= itemRefs.current.length) {
            return
          }
          itemRefs.current[selectedItem]?.click()
        },
      }
    }, [selectedItem])

    useEffect(() => {
      if (
        listRef.current === null ||
        selectedItem < 0 ||
        selectedItem >= itemRefs.current.length
      ) {
        return
      }

      let item = itemRefs.current[selectedItem]
      if (item === null) {
        return
      }

      if (item === itemUnderMouse.current) {
        itemUnderMouse.current = null
        return
      }
      itemUnderMouse.current = null

      let irect = item.getBoundingClientRect()
      let lrect = listRef.current.getBoundingClientRect()

      if (irect.bottom > lrect.bottom) {
        let top = listRef.current.scrollTop + (irect.bottom - lrect.bottom + 16)
        listRef.current.scrollTo({ top })
      } else {
        if (irect.top < lrect.top) {
          let top = irect.top - lrect.top + listRef.current.scrollTop - 16
          listRef.current.scrollTo({ top })
        }
      }
    }, [selectedItem])

    function onMouseMove(i: number) {
      if (i >= 0 && i < itemRefs.current.length) {
        itemUnderMouse.current = itemRefs.current[i]
      } else {
        itemUnderMouse.current = null
      }
      setSelectedItem(i)
    }

    return (
      <div
        className="flex flex-1 flex-col gap-4 overflow-y-scroll p-4"
        ref={listRef}
      >
        {searchResults.length === 0 ? (
          <div className="flex h-8 items-center justify-center">
            <div>
              No results for{" "}
              <span className="font-normal">“{searchInput.trim()}”</span>
            </div>
          </div>
        ) : (
          <>
            {isFavorites && (
              <h6 className="text-base font-normal">Suggested pages</h6>
            )}
            {searchResults.map((result, i) => (
              <SearchResultListItem
                item={result}
                key={i}
                active={i === selectedItem}
                tocIndex={tocIndex}
                ref={ref => {
                  itemRefs.current[i] = ref
                }}
                onFocus={() => setSelectedItem(i)}
                onClose={onClose}
                onMouseMove={() => onMouseMove(i)}
              />
            ))}
          </>
        )}
      </div>
    )
  },
)

export default SearchResultList
