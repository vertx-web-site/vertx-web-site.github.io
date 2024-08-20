"use client"

import { versionFromSlug } from "./versionFromSlug"
import { useSelectedLayoutSegment } from "next/navigation"

export function useVersionAndSlug(): {
  version?: string
  slug: string
} {
  const segment = useSelectedLayoutSegment() ?? ""
  return versionFromSlug(segment)
}
