import Sidebar from "./Sidebar"
import { Index, Section, Subsection } from "./Toc"
import Link from "@/components/LinkFix"
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect, useLayoutEffect, useRef } from "react"

interface SidebarRightProps {
  className?: string
  activeSection?: string
}

function sectionToLi(s: Section | Subsection, activeSection?: string) {
  return (
    <li key={s.slug}>
      <Link
        href={`#${s.slug}`}
        data-sidebar-section-slug={s.slug}
        className={clsx("hover:text-primary-hover", {
          "text-gray-700": activeSection !== s.slug,
          "font-normal text-primary": activeSection === s.slug,
        })}
      >
        {s.title}
      </Link>
    </li>
  )
}

const SidebarRight = ({ className, activeSection }: SidebarRightProps) => {
  const firstScroll = useRef<boolean>(true)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLUListElement>(null)
  const segment = useSelectedLayoutSegment()

  let activeSlug = segment ?? ""
  let entry = Index[activeSlug]
  let sections = undefined
  if (entry.type === "page") {
    sections = entry.sections?.flatMap(s => {
      let sli = sectionToLi(s, activeSection)
      if (s.subsections === undefined) {
        return [sli]
      } else {
        let sslis = s.subsections.map(ss => sectionToLi(ss, activeSection))
        let ssl = (
          <ul
            key={`${s.slug}-subsections`}
            className="flex flex-col gap-2 border-l border-gray-200 pl-3"
          >
            {sslis}
          </ul>
        )
        return [sli, ssl]
      }
    })
  }

  useLayoutEffect(() => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.scrollTop = 0
    }
  }, [activeSlug])

  useEffect(() => {
    if (sectionsRef.current === null || sidebarRef.current === null) {
      return
    }
    let element = sectionsRef.current.querySelector(
      `[data-sidebar-section-slug="${activeSection}"]`,
    )
    if (element !== null) {
      let erect = element.getBoundingClientRect()
      let srect = sectionsRef.current.getBoundingClientRect()
      let parent = sectionsRef.current.parentElement!.parentElement!
      let prect = parent.getBoundingClientRect()

      if (erect.bottom > prect.bottom || erect.top < prect.top) {
        let top = erect.top - srect.top
        sidebarRef.current.scrollTo({
          top,
          behavior: firstScroll.current ? "instant" : "smooth",
        })
      }

      firstScroll.current = false
    }
  }, [activeSection])

  let githubFilename = activeSlug
  if (githubFilename === "") {
    githubFilename = "get-started"
  }

  return (
    <Sidebar ref={sidebarRef} className={className}>
      {sections !== undefined ? (
        <>
          <div className="mb-4 font-normal">On this page</div>
          <ul
            className="mb-4 flex flex-col gap-2 border-b border-gray-200 pb-4"
            ref={sectionsRef}
          >
            {sections}
          </ul>
        </>
      ) : undefined}
      <Link
        href={`https://github.com/steep-wms/steep-wms.github.io/blob/master/src/content/docs/${githubFilename}.mdx`}
        className="text-gray-600 hover:text-primary-hover"
      >
        Edit this page on GitHub{" "}
        <ArrowSquareOut size="0.9em" className="mb-[3px] inline-flex" />
      </Link>
    </Sidebar>
  )
}

export default SidebarRight
