import { versionFromSlug } from "./versionFromSlug"
import { type Page, makeIndex, makeToc } from "@/components/docs/Toc"
import { latestRelease } from "@/docs/metadata/all"
import { CaretRight } from "@phosphor-icons/react/dist/ssr"
import { Cross as Hamburger } from "hamburger-react"
import { useSelectedLayoutSegment } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

interface TocNavBarProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const TocNavBar = ({ isOpen, setIsOpen }: TocNavBarProps) => {
  const { type, version, slug } = versionFromSlug(
    useSelectedLayoutSegment() ?? "",
  )

  const toc = makeToc(type, version ?? latestRelease.version)
  const index = makeIndex(toc)

  return (
    <nav className="fixed left-0 right-0 top-14 z-50 flex h-16 items-center gap-2 border-b border-gray-200 bg-bg bg-opacity-80 pl-0.5 pr-2 backdrop-blur-sm sm:pl-2.5 lg:hidden">
      <div>
        <Hamburger
          label="Show table of contents"
          toggled={isOpen}
          toggle={setIsOpen}
        />
      </div>
      <div className="max-w-min whitespace-nowrap text-gray-600">
        {index[(index[slug] as Page).chapter].title}
      </div>
      <CaretRight size="1em" />
      <div className="overflow-hidden text-ellipsis whitespace-nowrap font-normal">
        {index[slug].title}
      </div>
    </nav>
  )
}

export default TocNavBar
