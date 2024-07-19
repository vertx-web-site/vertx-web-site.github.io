// TODO
// import { Toc } from "@/components/docs/Toc"
import { MetadataRoute } from "next"

// HEADS UP: since we're using `output: export`, this page only works during
// static export (npm run build) but not in DEV mode (npm run dev).
// See https://github.com/vercel/next.js/issues/59136#issuecomment-1984966023

const root = `https://vertx.io${process.env.__NEXT_ROUTER_BASEPATH}`

export default function sitemap(): MetadataRoute.Sitemap {
  // const docPages = Toc.flatMap(chapter => {
  //   return chapter.pages.map(page => {
  //     let slug = page.slug
  //     if (slug !== "") {
  //       slug += "/"
  //     }
  //     return {
  //       url: `${root}/docs/${slug}`,
  //       lastModified: new Date(),
  //     }
  //   })
  // })
  const docPages: any[] = []

  // TODO update pages!
  return [
    {
      url: `${root}/`,
      lastModified: new Date(),
    },
    {
      url: `${root}/community/`,
      lastModified: new Date(),
    },
    ...docPages,
  ]
}
