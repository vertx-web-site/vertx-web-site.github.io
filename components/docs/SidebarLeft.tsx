import Sidebar from "./Sidebar"
import { Toc } from "@/components/docs/Toc"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect, useRef } from "react"

function createToc(activeSlug: string, onClickLink?: () => void) {
  let result = []
  for (let chapter of Toc) {
    let titleSlug = chapter.slug
    result.push(
      <li key={titleSlug}>
        <div className="mb-2 font-normal">{chapter.title}</div>
        <ul className="flex flex-col gap-2 border-l border-gray-200 pl-3">
          {chapter.pages.map(p => {
            return (
              <li
                key={p.slug}
                className={clsx({
                  "text-gray-700": p.slug !== activeSlug,
                  "font-normal text-primary": p.slug === activeSlug,
                })}
              >
                <Link
                  href={`/docs/${p.slug}`}
                  data-sidebar-page-slug={p.slug}
                  className="hover:text-primary-hover"
                  onClick={onClickLink}
                >
                  {p.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </li>,
    )
  }
  return result
}

interface SidebarLeftProps {
  className?: string
  sticky?: boolean
  onClickLink?: () => void
}

const SidebarLeft = ({ className, sticky, onClickLink }: SidebarLeftProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLUListElement>(null)
  const segment = useSelectedLayoutSegment()

  let activeSlug = segment ?? ""
  let toc = createToc(activeSlug, onClickLink)

  useEffect(() => {
    if (sectionsRef.current === null || sidebarRef.current === null) {
      return
    }
    let element = sectionsRef.current.querySelector(
      `[data-sidebar-page-slug="${activeSlug}"]`,
    )
    if (element !== null) {
      let erect = element.getBoundingClientRect()
      let srect = sectionsRef.current.getBoundingClientRect()
      let parent = sectionsRef.current.parentElement!.parentElement!
      let prect = parent.getBoundingClientRect()

      // center active item in view if necessary
      if (erect.bottom > prect.bottom || erect.top < prect.top) {
        let top = erect.top - srect.top
        sidebarRef.current.scrollTop = top - prect.height / 2 + erect.height / 2
      }
    }
  }, [activeSlug])

  return (
    <Sidebar ref={sidebarRef} className={className} sticky={sticky}>
      <ul className="mb-4 flex flex-col gap-6" ref={sectionsRef}>
        {toc}
      </ul>
    </Sidebar>
  )
}

export default SidebarLeft
