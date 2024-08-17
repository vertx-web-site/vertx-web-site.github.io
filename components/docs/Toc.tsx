import { latestRelease, metadata } from "@/docs/metadata/all"

export interface Chapter {
  readonly type: "chapter"
  readonly title: string
  readonly slug: string
  readonly slugWithVersion: string
  readonly pages: Page[]
}

export interface Page {
  readonly type: "page"
  readonly title: string
  readonly slug: string
  readonly slugWithVersion: string
  readonly chapter: string
  readonly sections?: Section[]
}

export interface Section {
  readonly type: "section"
  readonly title: string
  readonly slug: string
  readonly slugWithVersion: string
  readonly page: string
  readonly subsections?: Subsection[]
}

export interface Subsection {
  readonly type: "subsection"
  readonly title: string
  readonly slug: string
  readonly slugWithVersion: string
  readonly page: string
  readonly section: string
}

const introductionChapter: Chapter = {
  type: "chapter",
  title: "Introduction",
  slug: "introduction",
  slugWithVersion: "introduction",
  pages: [
    {
      type: "page",
      title: "Get started",
      slug: "",
      slugWithVersion: "",
      sections: [],
      chapter: "introduction",
    },
  ],
}

function slugWithVersion(
  doAddVersion: boolean,
  version: string,
  slug: string,
): string {
  if (doAddVersion) {
    if (slug !== "") {
      if (isExternal(slug)) {
        return slug
      }
      return `${version}/${slug}`
    } else {
      return version
    }
  }
  return slug
}

export function makeToc(activeSlug: string): Chapter[] {
  let release = latestRelease
  let versionMatch = activeSlug.match(/^(\d+\.\d+(\.\d+)?(-[^\/]+)?)(\/|$)/)
  let includesVersion = false
  if (versionMatch) {
    let version = versionMatch[1]
    let versionMetadata = metadata.find(m => m.version === version)
    if (versionMetadata === undefined) {
      throw new Error(`Could not find metadata for version ${version}`)
    }
    release = versionMetadata
    includesVersion = true
  }

  let result: Chapter[] = [
    {
      ...introductionChapter,
      slug: slugWithVersion(
        includesVersion,
        release.version,
        introductionChapter.slug,
      ),
      slugWithVersion: slugWithVersion(
        true,
        release.version,
        introductionChapter.slug,
      ),
      pages: introductionChapter.pages.map(p => ({
        ...p,
        slug: slugWithVersion(includesVersion, release.version, p.slug),
        slugWithVersion: slugWithVersion(true, release.version, p.slug),
        chapter: slugWithVersion(
          includesVersion,
          release.version,
          introductionChapter.slug,
        ),
      })),
    },
  ]

  for (let category of release.metadata.categories) {
    let chapterSlugWithVersion = slugWithVersion(
      true,
      release.version,
      category.id,
    )
    let chapterSlug = slugWithVersion(
      includesVersion,
      release.version,
      category.id,
    )

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
      let pageSlugWithVersion = slugWithVersion(true, release.version, pageSlug)
      pageSlug = slugWithVersion(includesVersion, release.version, pageSlug)

      let sections: Section[] | undefined = undefined
      //   if (p.sections !== undefined) {
      //     sections = []
      //     for (let s of p.sections) {
      //       let title
      //       let sectionSlug
      //       let subsections: Subsection[] | undefined = undefined
      //       if (typeof s === "string") {
      //         title = s
      //         sectionSlug = slug(title)
      //       } else {
      //         title = s.title
      //         sectionSlug = s.slug ?? slug(title)
      //         if (s.subsections !== undefined) {
      //           subsections = []
      //           for (let ss of s.subsections) {
      //             let title
      //             let subsectionSlug
      //             if (typeof ss === "string") {
      //               title = ss
      //               subsectionSlug = slug(title)
      //             } else {
      //               title = ss.title
      //               subsectionSlug = ss.slug ?? slug(title)
      //             }
      //             subsections.push({
      //               title,
      //               type: "subsection",
      //               slug: subsectionSlug,
      //               page: pageSlug,
      //               section: sectionSlug,
      //             })
      //           }
      //         }
      //       }
      //       sections.push({
      //         title,
      //         type: "section",
      //         slug: sectionSlug,
      //         page: pageSlug,
      //         subsections,
      //       })
      //     }
      //   }

      pages.push({
        type: "page",
        title: e.name,
        slug: pageSlug,
        slugWithVersion: pageSlugWithVersion,
        sections,
        chapter: chapterSlug,
      })
    }

    result.push({
      type: "chapter",
      title: category.name,
      slug: chapterSlug,
      slugWithVersion: chapterSlugWithVersion,
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
