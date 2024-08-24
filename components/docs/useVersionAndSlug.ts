"use client"

import { versionFromSlug } from "./versionFromSlug"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"

export function useVersionAndSlug(): {
  version?: string
  slug: string
} {
  let segment = useSelectedLayoutSegment()
  if (segment === null) {
    let pathname = usePathname()
    if (pathname.startsWith("/docs/")) {
      pathname = pathname.substring(6)
    }
    if (pathname.startsWith("/")) {
      pathname = pathname.substring(1)
    }
    if (pathname.endsWith("/")) {
      pathname = pathname.substring(0, pathname.length - 1)
    }
    segment = pathname
  }
  return versionFromSlug(segment)
}
