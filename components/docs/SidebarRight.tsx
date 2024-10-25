import { useActiveSection } from "../hooks/useActiveSection"
import asyncBoundingClientRect from "../lib/async-bounding-client-rect"
import Sidebar from "./Sidebar"
import { Section, Subsection, makeIndex, makeToc } from "./Toc"
import { versionFromSlug } from "./versionFromSlug"
import { latestRelease } from "@/docs/metadata/all"
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { useCallback, useLayoutEffect, useRef } from "react"
import { useShallow } from "zustand/react/shallow"

interface SidebarRightProps {
  className?: string
  activeSection?: string
}

function sectionToLi(
  s: Section | Subsection,
  activeSection: string | undefined,
  isSubsection: boolean,
) {
  let hash = s.slug.substring(s.slug.indexOf("#") + 1)
  return (
    <li key={hash}>
      <Link
        href={`#${hash}`}
        data-sidebar-section-slug={hash}
        className={clsx("inline-block hover:text-primary-hover", {
          "pl-3": isSubsection,
          "text-gray-700": activeSection !== hash,
          "font-normal text-primary": activeSection === hash,
          "-ml-px border-l border-primary-area":
            activeSection === hash && isSubsection,
        })}
      >
        {s.title}
      </Link>
    </li>
  )
}

const SidebarRight = ({ className }: SidebarRightProps) => {
  const firstScroll = useRef<boolean>(true)
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const sectionsRef = useRef<HTMLUListElement>(null)
  const { type, version, slug } = versionFromSlug(
    useSelectedLayoutSegment() ?? "",
  )
  const { activeSection } = useActiveSection(
    useShallow(state => ({
      activeSection: state.activeSection,
    })),
  )

  const toc = makeToc(type, version ?? latestRelease.version)
  const index = makeIndex(toc)

  let entry = index[slug]
  let sections = undefined
  let edit = undefined
  let includeBook = false
  if (entry.type === "page") {
    sections = entry.sections?.flatMap(s => {
      let sli = sectionToLi(s, activeSection, false)
      if (s.subsections === undefined) {
        return [sli]
      } else {
        let sslis = s.subsections.map(ss =>
          sectionToLi(ss, activeSection, true),
        )
        let ssl = (
          <ul
            key={`${s.slug}-subsections`}
            className="flex flex-col gap-2 border-l border-gray-200"
          >
            {sslis}
          </ul>
        )
        return [sli, ssl]
      }
    })
    edit = entry.edit
    includeBook = entry.includeBook ?? false
  }

  useLayoutEffect(() => {
    if (sidebarRef.current !== null) {
      sidebarRef.current.scrollTop = 0
    }
  }, [slug])

  let handleSidebarRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (sectionsRef.current === null || node === null) {
        return
      }
      if (sidebarRef.current !== node) {
        firstScroll.current = true
      }
      sidebarRef.current = node
      let element = sectionsRef.current.querySelector(
        `[data-sidebar-section-slug="${activeSection}"]`,
      )
      if (element !== null) {
        // asynchronously get rects to avoid forced reflow
        asyncBoundingClientRect([element, sectionsRef.current, node]).then(
          ([erect, srect, prect]) => {
            if (erect.bottom > prect.bottom || erect.top < prect.top) {
              let top = erect.top - srect.top
              node.scrollTo({
                top,
                behavior: firstScroll.current ? "instant" : "smooth",
              })
            }
          },
        )
        firstScroll.current = false
      }
    },
    [activeSection],
  )

  return (
    <Sidebar ref={handleSidebarRef} className={className}>
      <div className="mb-4">
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
        {edit !== undefined ? (
          <Link
            href={edit}
            className="text-gray-600 hover:text-primary-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit this page on GitHub{" "}
            <ArrowSquareOut size="0.9em" className="mb-[3px] inline-flex" />
          </Link>
        ) : undefined}
        {includeBook ? (
          <div className="mb-10 mt-14">
            <Link
              href="https://www.manning.com/books/vertx-in-action"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mb-3">
                <img
                  src={require("@/assets/book-cover.jpg")}
                  width="400"
                  height="502"
                  alt="Vert.x in Action book cover"
                  className="max-w-44 rounded-sm border border-gray-200"
                />
              </div>
              <div className="text-gray-600">
                Asynchronous and Reactive Java
              </div>
              <h3 className="mb-2 text-base font-medium text-primary">
                Vert.x in Action
              </h3>
              <div className="text-xs">
                Build responsive, resilient, and scalable JVM applications using
                well-established reactive design patterns.
              </div>
            </Link>
          </div>
        ) : undefined}
      </div>
    </Sidebar>
  )
}

export default SidebarRight
