import * as cheerio from "cheerio"
import { metadata, versions } from "../../docs/metadata/all"
import { filterLatestBugfixVersions } from "../../docs/metadata/helpers"
import fs from "fs/promises"
import { convert } from "html-to-text"
import os from "os"
import pMap from "p-map"
import path from "path"

interface Entry {
  slug: string
  body: string
}

function nodeToString($node: cheerio.Cheerio<cheerio.Element>) {
  let text = convert($node.html()!, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
      {
        selector: "dt",
        format: "inlineSurround",
        options: {
          suffix: ": ",
        },
      },
      {
        selector: "dd",
        format: "inlineSurround",
        options: {
          suffix: "\n",
        },
      },
      { selector: "pre", format: "skip" },
      { selector: "td", format: "inlineSurround", options: { suffix: " " } },
      {
        selector: "ul",
        format: "unorderedList",
        options: { itemPrefix: "• " },
      },
    ],
  })

  // cleanup
  text = text.replace(/\r/gm, "").replace(/^\n+/gm, "")

  return text
}

async function main() {
  let filteredVersions = filterLatestBugfixVersions(versions)

  await pMap(
    filteredVersions,
    async v => {
      console.log(`Scraping documentation of version ${v} ...`)
      return scrapeVersion(v)
    },
    { concurrency: Math.max(1, os.cpus().length / 2) },
  )
}

async function scrapeVersion(version: string) {
  let entries = metadata.find(m => m.version === version)?.metadata?.entries
  if (entries === undefined) {
    throw new Error(`Unable to find metadata for version ${version}`)
  }

  let result: Entry[] = []
  for (let e of entries) {
    if (/^https?:\/\//.test(e.href)) {
      // skip external pages
      continue
    }
    let slug = e.href
    if (slug.startsWith("/")) {
      slug = slug.substring(1)
    }
    if (slug.endsWith("/")) {
      slug = slug.substring(0, slug.length - 1)
    }
    let f = `../out/docs/${version}/${slug}/index.html`
    let content = await fs.readFile(f, "utf8")
    let $ = cheerio.load(content)
    let $main = $("main").first()

    $main.find("h1").remove()

    let $sections = $main.find("div[class='sect1'],div[class='sect2']")

    // convert sections first
    $sections.each((i, el) => {
      let $n = $(el)
      let id
      if ($n.attr("class") === "sect1") {
        let h = $n.find("h2").first()
        id = h.attr("id")!
        h.remove()
      } else {
        let h = $n.find("h3").first()
        id = h.attr("id")!
        h.remove()
      }
      let s = nodeToString($n)
      result.push({
        slug: `${slug}#${id}`,
        body: s,
      })
    })

    // remove all sections
    $sections.remove()

    // now convert page
    let s = nodeToString($main)
    result.push({
      slug,
      body: s,
    })
  }

  for (let dest of ["out", "public"]) {
    await fs.mkdir(`../${dest}/docs/${version}`, { recursive: true })
    await fs.writeFile(
      `../${dest}/docs/${version}/index.json`,
      JSON.stringify(result),
    )
  }
}

main().catch(console.error)
