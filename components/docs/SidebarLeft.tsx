import Label from "../Label"
import Sidebar from "./Sidebar"
import { versionFromSlug } from "./versionFromSlug"
import { isExternal, makeToc } from "@/components/docs/Toc"
import { latestRelease } from "@/docs/metadata/all"
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect, useRef } from "react"

function createToc(
  version: string | undefined,
  activeSlug: string,
  onClickLink?: () => void,
) {
  let actualVersion = version ?? latestRelease.version
  let result = []
  let toc = makeToc(actualVersion)
  for (let chapter of toc) {
    let titleSlug = chapter.slug
    result.push(
      <li key={titleSlug}>
        <div className="mb-2 font-normal">{chapter.title}</div>
        <ul className="flex flex-col gap-2 border-l border-gray-200 pl-3">
          {chapter.pages.map(p => {
            let ext = isExternal(p.slug)
            return (
              <li
                key={p.slug}
                className={clsx({
                  "text-gray-700": p.slug !== activeSlug,
                  "font-normal text-primary": p.slug === activeSlug,
                })}
              >
                <Link
                  href={
                    ext
                      ? p.slug
                      : `/docs/${version !== undefined ? `${version}/${p.slug}` : p.slug}`
                  }
                  data-sidebar-page-slug={p.slug}
                  className="inline-flex flex-row flex-wrap items-center gap-2 hover:text-primary-hover"
                  onClick={onClickLink}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                >
                  {ext ? (
                    <div>
                      {p.title}{" "}
                      <ArrowSquareOut
                        size="0.9em"
                        className="mb-[3px] inline-flex"
                      />
                    </div>
                  ) : (
                    p.title
                  )}
                  {p.label !== undefined ? (
                    <Label type="transparent">{p.label}</Label>
                  ) : undefined}
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
  const { version, slug } = versionFromSlug(useSelectedLayoutSegment() ?? "")

  let toc = createToc(version, slug, onClickLink)

  useEffect(() => {
    if (sectionsRef.current === null || sidebarRef.current === null) {
      return
    }
    let element = sectionsRef.current.querySelector(
      `[data-sidebar-page-slug="${slug}"]`,
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
  }, [slug])

  return (
    <Sidebar ref={sidebarRef} className={className} sticky={sticky}>
      <ul className="mb-4 flex flex-col gap-6" ref={sectionsRef}>
        {toc}
      </ul>
    </Sidebar>
  )
}

export default SidebarLeft
