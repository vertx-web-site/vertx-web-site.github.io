import cloneDeepWith from "lodash/cloneDeepWith"
import pull from "lodash/pull"
import * as _remove from "lodash/remove"
import React from "react"

function clone(docs) {
  return cloneDeepWith(docs, e => {
    if (React.isValidElement(e)) {
      return React.cloneElement(e)
    }
  })
}

function find(docs, name) {
  return docs.entries.find(e => e.id === name)
}

function findCategory(docs, name) {
  return docs.categories.find(c => c.id === name)
}

function insert(docs, beforeEntryName, ...newEntries) {
  docs.entries.splice(docs.entries.findIndex(e => e.id === beforeEntryName), 0, ...newEntries)
}

function move(docs, entryName, beforeEntryName) {
  let entry = docs.entries.find(e => e.id === entryName)
  pull(docs.entries, entry)
  docs.entries.splice(docs.entries.findIndex(e => e.id === beforeEntryName), 0, entry)
}

function remove(docs, entryName) {
  _remove(docs.entries, e => e.id === entryName)
}

function parseVersion(v) {
  let parts = v.split(/\.|-/)
  let numericParts = []
  let remainder
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
    remainder
  }
}

function compareVersion(a, b) {
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

function filterLatestBugfixVersions(versions) {
  let parsedVersions = versions.map(parseVersion)

  // get latest patch version for each major.minor version
  let filteredVersions = new Map()
  for (let v of parsedVersions) {
    let mm = `${v.major}.${v.minor}`
    let existingVersion = filteredVersions.get(mm)
    if (existingVersion === undefined || compareVersion(v, existingVersion) > 0) {
      filteredVersions.set(mm, v)
    }
  }

  // sort versions
  let sortedVersions = []
  for (let fv of filteredVersions.values()) {
    sortedVersions.push(fv)
  }
  sortedVersions.sort(compareVersion)
  sortedVersions.reverse()

  return sortedVersions.map(v => v.raw)
}

export {
  clone,
  find,
  findCategory,
  insert,
  move,
  remove,
  filterLatestBugfixVersions
}
