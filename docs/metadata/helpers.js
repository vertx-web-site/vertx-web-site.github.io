import cloneDeepWith from "lodash/cloneDeepWith"
import pull from "lodash/pull"
import * as _remove from "lodash/remove"
import { major, minor, maxSatisfying, rsort } from "semver"
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

function filterLatestBugfixVersions(versions) {
  let majorAndMinorVersions = new Set()
  for (let v of versions) {
    majorAndMinorVersions.add(major(v) + "." + minor(v))
  }

  let filteredVersions = []
  for (let mmv of majorAndMinorVersions) {
    filteredVersions.push(maxSatisfying(versions, mmv))
  }

  return rsort(filteredVersions)
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
