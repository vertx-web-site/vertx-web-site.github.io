import { useIsMobile } from "../hooks/useIsMobile"
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"
import { KeyboardEvent } from "react"

interface SearchInputBarProps {
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onUp: () => void
  onDown: () => void
  onSubmit: () => void
}

const SearchInputBar = ({
  onChangeSearchInput,
  onClose,
  onUp,
  onDown,
  onSubmit,
}: SearchInputBarProps) => {
  const isMobile = useIsMobile()

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit()
      e.preventDefault()
    } else if (e.key === "ArrowDown") {
      onDown()
      e.preventDefault()
    } else if (e.key === "ArrowUp") {
      onUp()
      e.preventDefault()
    }
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center justify-center pl-4 text-gray-700">
        <MagnifyingGlass />
      </div>
      <input
        type="text"
        className="min-w-0 flex-1 rounded-lg bg-bg py-4 text-lg outline-none dark:bg-gray-100 md:text-base lg:text-sm"
        placeholder="Search documentation"
        onChange={onChangeSearchInput}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus={true}
        onKeyDown={onKeyDown}
      />
      <div className="flex items-center justify-center pr-5">
        <button
          className="flex h-5 items-center rounded border border-gray-200 px-1 text-xs text-gray-600 hover:border-gray-400"
          onClick={() => onClose()}
        >
          {isMobile === true ? "Close" : "Esc"}
        </button>
      </div>
    </div>
  )
}

export default SearchInputBar
