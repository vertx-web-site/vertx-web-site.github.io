import Docs from "../../components/layouts/Docs"
import DocsIndex from "../../components/layouts/DocsIndex"
import VersionContext from "../../components/contexts/VersionContext"
import { metadata, latestRelease } from "../../docs/metadata/all"
import { useContext, useEffect } from "react"
import { fetchGitHubStarsByUrl } from "../../components/lib/github-stars"

const compiledDocsPath = "docs/compiled"

async function readDirRecursive(dir, fs, path, result = []) {
  let files = await fs.readdir(dir)
  for (let f of files) {
    let absolute = path.join(dir, f)
    if ((await fs.stat(absolute)).isDirectory()) {
      await readDirRecursive(absolute, fs, path, result)
    } else {
      if (f === "index.json") {
        result.push(absolute)
      }
    }
  }
  return result
}

export async function getStaticPaths() {
  const fs = require("fs").promises
  const path = require("path")
  const { slash } = await import("../../components/lib/path-utils")

  let paths = []

  // catch versions
  for (let m of metadata) {
    paths.push({
      params: {
        slug: [m.version]
      }
    })
  }

  // check if compiled documentation files exist
  try {
    await fs.access(compiledDocsPath)
  } catch (e) {
    console.warn(
      "\n\n************************************************************\n" +
          "WARNING: Compiled AsciiDoc files of documentation not found.\n" +
          "Please run `npm run update-docs'\n" +
          "************************************************************\n")
    return {
      paths: [],
      fallback: false
    }
  }

  let files = await readDirRecursive(compiledDocsPath, fs, path)
  for (let f of files) {
    let m = slash(f).match(new RegExp(`${compiledDocsPath}/(.+)index.json`))
    if (m) {
      let slug = m[1].split("/").slice(0, -1)
      if (slug.length > 1) { // don't include index.json in parent directory
        paths.push({ params: { slug } })

        if (latestRelease.version === slug[0]) {
          // generate pages for latest version too
          paths.push({ params: { slug: slug.slice(1) } })
        }
      }
    }
  }

  // add index page
  paths.push({ params: { slug: [] } })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const fs = require("fs/promises")
  const path = require("path")

  // handle index page
  if (!params.slug) {
    return {
      props: {}
    }
  }

  // get version
  let version
  if (metadata.some(m => m.version === params.slug[0])) {
    version = params.slug[0]
  }

  // handle version index
  if (version !== undefined && params.slug.length <= 1) {
    return {
      props: {
        version: params.slug[0]
      }
    }
  }

  let slug = params.slug.join("/")
  let sourcePath
  if (version === undefined) {
    sourcePath = path.join(compiledDocsPath, latestRelease.version, slug, "index.json")
  } else {
    sourcePath = path.join(compiledDocsPath, slug, "index.json")
  }
  let { title, contents, toc } = JSON.parse(await fs.readFile(sourcePath, "utf-8"))

  // get metadata for this page
  let versionMetadata = getMetadataByVersion(version)
  let pageMetadata = findMetadataEntryBySlug(versionMetadata.metadata, slug)
  let fallbackGitHubStars = null
  if (pageMetadata !== undefined) {
    fallbackGitHubStars = (await fetchGitHubStarsByUrl(pageMetadata.repository)) || null
  }

  return {
    props: {
      slug,
      title,
      fallbackGitHubStars,
      toc,
      contents,
      ...(version && { version })
    }
  }
}

function findMetadataEntryBySlug(metadata, slug) {
  let slugWithSlash = slug
  if (!slug.endsWith("/")) {
    slugWithSlash += "/"
  }
  return metadata.entries.find(e => {
    let href = e.href
    if (href.startsWith("/")) {
      href = href.substring(1)
    }
    return slugWithSlash.endsWith(href)
  })
}

function getMetadataByVersion(version) {
  if (version !== undefined) {
    return metadata.find(m => m.version === version)
  }
  return latestRelease
}

const DocsPage = ({ slug, title, fallbackGitHubStars, toc, contents, version }) => {
  const setVersion = useContext(VersionContext.Dispatch)

  useEffect(() => {
    setVersion({ version })
  }, [setVersion, version])

  let m = getMetadataByVersion(version)
  if (contents === undefined) {
    return <DocsIndex metadata={m} version={version} />
  } else {
    // get metadata
    let sm = findMetadataEntryBySlug(m.metadata, slug)
    if (sm === undefined) {
      sm = { name: title }
    }

    // get all versions containing docs for this slug
    let allVersions = metadata
      .filter(am => findMetadataEntryBySlug(am.metadata, slug) !== undefined)
      .map(am => am.version)

    return <Docs metadata={sm} allVersions={allVersions}
      fallbackGitHubStars={fallbackGitHubStars} toc={toc} contents={contents} />
  }
}

export default DocsPage
