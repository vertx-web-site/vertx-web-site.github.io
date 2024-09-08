import { Category, Doc, Docs } from "./types"
import cloneDeepWith from "lodash/cloneDeepWith"
import pull from "lodash/pull"
import _remove from "lodash/remove"
import React from "react"

export interface Version {
  raw: string
  major: number
  minor: number
  patch: number
  remainder?: string
}

export function clone(docs: Docs): Docs {
  return cloneDeepWith(docs, e => {
    if (React.isValidElement(e)) {
      return React.cloneElement(e)
    }
  })
}

export function find(docs: Docs, id: string): Doc {
  let r = docs.entries.find(e => e.id === id)
  if (r === undefined) {
    throw new Error(`Could not find docs with ID '${id}'`)
  }
  return r
}

export function findCategory(docs: Docs, id: string): Category {
  let r = docs.categories.find(c => c.id === id)
  if (r === undefined) {
    throw new Error(`Could not find category with ID '${id}'`)
  }
  return r
}

export function insert(
  docs: Docs,
  beforeEntryId: string,
  ...newEntries: Doc[]
) {
  docs.entries.splice(
    docs.entries.findIndex(e => e.id === beforeEntryId),
    0,
    ...newEntries,
  )
}

export function move(docs: Docs, entryId: string, beforeEntryId: string) {
  let entry = docs.entries.find(e => e.id === entryId)
  if (entry !== undefined) {
    pull(docs.entries, entry)
    docs.entries.splice(
      docs.entries.findIndex(e => e.id === beforeEntryId),
      0,
      entry,
    )
  }
}

export function remove(docs: Docs, entryId: string) {
  _remove(docs.entries, e => e.id === entryId)
}

export function removeCategory(docs: Docs, categoryId: string) {
  _remove(docs.categories, c => c.id === categoryId)
}

export function parseVersion(v: string): Version {
  let parts = v.split(/\.|-/)
  let numericParts: number[] = []
  let remainder: string | undefined = undefined
  for (let i = 0; i < parts.length; ++i) {
    if (isNaN(parseInt(parts[i]))) {
      remainder = parts.slice(i).join(".")
      break
    }
    numericParts.push(+parts[i])
  }
  while (numericParts.length < 3) {
    numericParts.push(0)
  }
  return {
    raw: v,
    major: numericParts[0],
    minor: numericParts[1],
    patch: numericParts[2],
    remainder,
  }
}

export function compareVersion(a: Version, b: Version): number {
  if (a.major - b.major !== 0) {
    return a.major - b.major
  }
  if (a.minor - b.minor !== 0) {
    return a.minor - b.minor
  }
  if (a.patch - b.patch !== 0) {
    return a.patch - b.patch
  }
  if (a.remainder !== undefined && b.remainder === undefined) {
    return -1
  }
  if (a.remainder === undefined && b.remainder !== undefined) {
    return 1
  }
  if (a.remainder !== undefined && b.remainder !== undefined) {
    return a.remainder.localeCompare(b.remainder)
  }
  return 0
}

export function filterLatestBugfixVersions(versions: string[]): string[] {
  let parsedVersions = versions.map(parseVersion)

  // get latest patch version for each major.minor version
  let filteredVersions = new Map<string, Version>()
  for (let v of parsedVersions) {
    let mm = `${v.major}.${v.minor}`
    let existingVersion = filteredVersions.get(mm)
    if (
      existingVersion === undefined ||
      compareVersion(v, existingVersion) > 0
    ) {
      filteredVersions.set(mm, v)
    }
  }

  // sort versions
  let sortedVersions: Version[] = []
  filteredVersions.forEach(fv => {
    sortedVersions.push(fv)
  })
  sortedVersions.sort(compareVersion)
  sortedVersions.reverse()

  return sortedVersions.map(v => v.raw)
}
