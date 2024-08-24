import { metadata } from "@/docs/metadata/all"

export interface Chapter {
  readonly type: "chapter"
  readonly title: string
  readonly slug: string
  readonly pages: Page[]
}

export interface Page {
  readonly type: "page"
  readonly title: string
  readonly slug: string
  readonly label?: string
  readonly edit?: string
  readonly chapter: string
  readonly sections?: Section[]
}

export interface Section {
  readonly type: "section"
  readonly title: string
  readonly slug: string
  readonly page: string
  readonly subsections?: Subsection[]
}

export interface Subsection {
  readonly type: "subsection"
  readonly title: string
  readonly slug: string
  readonly page: string
  readonly section: string
}

const introductionChapter: Chapter = {
  type: "chapter",
  title: "Introduction",
  slug: "introduction",
  pages: [
    {
      type: "page",
      title: "Get started",
      slug: "",
      edit: "https://github.com/vertx-web-site/vertx-web-site.github.io/blob/master/app/docs/%5B%5B...slug%5D%5D/get-started.mdx",
      sections: [
        {
          type: "section",
          title: "1. Bootstrap",
          slug: "bootstrap",
          page: "",
        },
        {
          type: "section",
          title: "2. Code",
          slug: "code",
          page: "",
        },
        {
          type: "section",
          title: "3. Run",
          slug: "run",
          page: "",
        },
        {
          type: "section",
          title: "4. Go further",
          slug: "go-further",
          page: "",
        },
      ],
      chapter: "introduction",
    },
    {
      type: "page",
      title: "Intro to reactive",
      slug: "intro-to-reactive",
      edit: "https://github.com/vertx-web-site/vertx-web-site.github.io/blob/master/app/docs/%5B%5B...slug%5D%5D/intro-to-reactive.mdx",
      sections: [
        {
          type: "section",
          title: "In the beginning, there were threads...",
          slug: "in-the-beginning-there-were-threads",
          page: "intro-to-reactive",
        },
        {
          type: "section",
          title: "Multi-threading is “simple” but limited",
          slug: "multi-threading-is-simple-but-limited",
          page: "intro-to-reactive",
        },
        {
          type: "section",
          title:
            "Asynchronous programming: scalability and resource efficiency",
          slug: "asynchronous-programming-scalability-and-resource-efficiency",
          page: "intro-to-reactive",
        },
        {
          type: "section",
          title:
            "Pick the best asynchronous programming model for your problem domain",
          slug: "pick-the-best-asynchronous-programming-model-for-your-problem-domain",
          page: "intro-to-reactive",
        },
        {
          type: "section",
          title: "Don't let failures ruin responsiveness",
          slug: "dont-let-failures-ruin-responsiveness",
          page: "intro-to-reactive",
        },
        {
          type: "section",
          title: "A rich ecosystem",
          slug: "a-rich-ecosystem",
          page: "intro-to-reactive",
        },
      ],
      chapter: "introduction",
    },
    {
      type: "page",
      title: "App generator",
      slug: "https://start.vertx.io/",
      sections: [],
      chapter: "introduction",
    },
  ],
}

export function makeToc(version: string): Chapter[] {
  let release = metadata.find(m => m.version === version)
  if (release === undefined) {
    throw new Error(`Could not find metadata for version ${version}`)
  }

  let result: Chapter[] = [introductionChapter]

  for (let category of release.metadata.categories) {
    let entries = release.metadata.entries.filter(
      e => e.category === category.id,
    )

    let pages: Page[] = []
    for (let e of entries) {
      let pageSlug = e.href
      if (pageSlug.startsWith("/")) {
        pageSlug = pageSlug.substring(1)
      }
      if (pageSlug.endsWith("/")) {
        pageSlug = pageSlug.substring(0, pageSlug.length - 1)
      }

      let sections: Section[] | undefined = undefined

      if (!isExternal(pageSlug)) {
        let data = require(
          `../../docs/compiled/${version}/${pageSlug}/index.toc.json`,
        )
        if (data.toc !== undefined) {
          sections = []

          for (let s of data.toc) {
            let subsections: Subsection[] | undefined = undefined
            let sectionSlug = `${pageSlug}${s.id}`

            if (s.children !== undefined) {
              subsections = []

              for (let ss of s.children) {
                subsections.push({
                  title: ss.title,
                  type: "subsection",
                  slug: `${pageSlug}${ss.id}`,
                  page: pageSlug,
                  section: sectionSlug,
                })
              }
            }

            sections.push({
              title: s.title,
              type: "section",
              slug: sectionSlug,
              page: pageSlug,
              subsections,
            })
          }
        }
      }

      pages.push({
        type: "page",
        title: e.name,
        slug: pageSlug,
        label: e.label,
        edit: e.edit,
        sections,
        chapter: category.id,
      })
    }

    result.push({
      type: "chapter",
      title: category.name,
      slug: category.id,
      pages,
    })
  }

  return result
}

export function makeIndex(
  indexedToc: Chapter[],
): Record<string, Chapter | Page | Section | Subsection> {
  let result: Record<string, Chapter | Page | Section | Subsection> = {}

  function add(e: Chapter | Page | Section | Subsection) {
    if (result[e.slug] !== undefined) {
      throw new Error(`Duplicate slug: ${e.slug}`)
    }
    result[e.slug] = e
  }

  for (let chapter of indexedToc) {
    for (let p of chapter.pages) {
      if (p.sections !== undefined) {
        for (let s of p.sections) {
          if (s.subsections !== undefined) {
            for (let ss of s.subsections) {
              add(ss)
            }
          }
          add(s)
        }
      }
      add(p)
    }
    add(chapter)
  }

  return result
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}
