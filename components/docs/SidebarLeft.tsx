import Label from "../Label"
import { useVersion } from "../hooks/useVersion"
import asyncBoundingClientRect from "../lib/async-bounding-client-rect"
import Sidebar from "./Sidebar"
import { versionFromSlug } from "./versionFromSlug"
import { isExternal, makeToc } from "@/components/docs/Toc"
import { latestRelease } from "@/docs/metadata/all"
import guides from "@/docs/metadata/guides"
import howtos from "@/docs/metadata/howtos"
import {
  ArrowSquareOut,
  GraduationCap,
  Notebook,
  Signpost,
} from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React, { useCallback, useLayoutEffect } from "react"
import { useRef } from "react"

function createToc(
  type: "docs" | "howtos" | "guides",
  version: string | undefined,
  activeSlug: string,
  onClickLink?: () => void,
) {
  let actualVersion = version ?? latestRelease.version
  let result = []
  let toc = makeToc(type, actualVersion)
  for (let chapter of toc) {
    let titleSlug = chapter.slug
    result.push(
      <li key={titleSlug}>
        <div className="mb-2 font-normal text-gray-900">{chapter.title}</div>
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
                      : `/docs/${type === "howtos" || type === "guides" ? `${type}/` : ""}${version !== undefined ? `${version}/${p.slug}` : p.slug}`
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
  const lastType = useRef<string | undefined>(undefined)
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const { type, version, slug } = versionFromSlug(
    useSelectedLayoutSegment() ?? "",
  )
  const { version: activeVersion } = useVersion()

  let toc = createToc(type, version, slug, onClickLink)

  useLayoutEffect(() => {
    if (sidebarRef.current === null) {
      return
    }
    if (lastType.current !== undefined && lastType.current !== type) {
      sidebarRef.current.scrollTop = 0
    }
    lastType.current = type
  }, [type])

  const handleSidebarRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (sectionsRef.current === null || node === null) {
        return
      }
      sidebarRef.current = node
      let element = sectionsRef.current.querySelector(
        `[data-sidebar-page-slug="${slug}"]`,
      )
      if (element !== null) {
        // asynchronously get rects to avoid forced reflow
        asyncBoundingClientRect([element, sectionsRef.current, node]).then(
          ([erect, srect, prect]) => {
            // center active item in view if necessary
            if (erect.bottom > prect.bottom || erect.top < prect.top) {
              let top = erect.top - srect.top
              node.scrollTop = top - prect.height / 2 + erect.height / 2
            }
          },
        )
      }
    },
    [slug],
  )

  let books = [
    {
      title: "Documentation",
      type: "docs",
      icon: <Notebook />,
      href:
        activeVersion !== latestRelease.version
          ? `/docs/${activeVersion}/`
          : "/docs/",
    },
    {
      title: "How-tos",
      type: "howtos",
      icon: <GraduationCap />,
      href: `/docs/howtos${howtos.entries[0].href}`,
    },
    {
      title: "Guides",
      type: "guides",
      icon: <Signpost />,
      href: `/docs/guides${guides.entries[0].href}`,
    },
  ]

  return (
    <Sidebar ref={handleSidebarRef} className={className} sticky={sticky}>
      <div ref={sectionsRef}>
        <ul className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-6 font-normal">
          {books.map(book => {
            let active = book.type === type
            return (
              <li key={book.title}>
                <Link
                  href={book.href}
                  className={clsx("group inline-flex items-center gap-2", {
                    "text-primary hover:text-primary-hover": active,
                    "text-gray-700 hover:text-primary-hover dark:text-gray-600 dark:hover:text-primary-hover":
                      !active,
                  })}
                >
                  <div
                    className={clsx("rounded-sm border p-[0.2rem]", {
                      "border-primary/30 bg-primary/5 group-hover:border-primary-hover/30 dark:border-primary/70 dark:bg-primary/10 dark:group-hover:border-primary-hover/70":
                        active,
                      "border-gray-700/30 group-hover:border-primary-hover/30 group-hover:bg-primary/5 dark:border-gray-700/40 dark:group-hover:border-primary-hover/70":
                        !active,
                    })}
                  >
                    {React.cloneElement(book.icon, {
                      weight: active ? "fill" : "regular",
                      size: "1.1em",
                    })}
                  </div>
                  <div>{book.title}</div>
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className="mb-4 flex flex-col gap-6">{toc}</ul>
      </div>
    </Sidebar>
  )
}

export default SidebarLeft
