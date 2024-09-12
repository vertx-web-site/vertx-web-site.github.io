import allPosts from "@/.generated/allposts.json"
import { isExternal, makeToc } from "@/components/docs/Toc"
import { latestRelease, versions } from "@/docs/metadata/all"
import { filterLatestBugfixVersions } from "@/docs/metadata/helpers"
import dayjs from "dayjs"
import { MetadataRoute } from "next"

// HEADS UP: since we're using `output: export`, this page only works during
// static export (npm run build) but not in DEV mode (npm run dev).
// See https://github.com/vercel/next.js/issues/59136#issuecomment-1984966023

const root = `https://vertx.io${process.env.__NEXT_ROUTER_BASEPATH}`

export default function sitemap(): MetadataRoute.Sitemap {
  let docPages: MetadataRoute.Sitemap = []

  let filteredVersions = filterLatestBugfixVersions(versions)
  for (let version of filteredVersions) {
    let toc = makeToc(version)
    for (let chapter of toc) {
      let filteredPages = chapter.pages.filter(page => !isExternal(page.slug))
      for (let page of filteredPages) {
        let slug = page.slug
        if (slug !== "") {
          slug += "/"
        }
        let v = ""
        if (version !== latestRelease.version) {
          v = `${version}/`
        }
        docPages.push({
          url: `${root}/docs/${v}${slug}`,
          lastModified: new Date(),
        })
      }
    }
  }

  let blogPages: MetadataRoute.Sitemap = []
  for (let post of allPosts) {
    blogPages.push({
      url: `${root}/blog/${post.slug}`,
      lastModified: dayjs(post.date, { utc: true }).toDate(),
    })
  }

  return [
    {
      url: `${root}/`,
      lastModified: new Date(),
    },
    {
      url: `${root}/community/`,
      lastModified: new Date(),
    },
    {
      url: `${root}/download`,
      lastModified: new Date(),
    },
    {
      url: `${root}/resources`,
      lastModified: new Date(),
    },
    ...docPages,
    ...blogPages,
  ]
}
