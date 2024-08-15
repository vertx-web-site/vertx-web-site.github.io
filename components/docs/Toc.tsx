// alternative to the 'github-slugger' package; shaves off about 3KB of JS
function slug(s: string) {
  return s
    .toLowerCase()
    .replaceAll(/[^ \-a-z]/g, "")
    .replaceAll(/ /g, "-")
}

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

type DraftSubsection =
  | string
  | (Omit<Subsection, "type" | "slug" | "page" | "section"> & { slug?: string })
type DraftSection =
  | string
  | (Omit<Section, "type" | "slug" | "page" | "subsections"> & {
      readonly slug?: string
      readonly subsections?: DraftSubsection[]
    })
type DraftPage = Omit<Page, "type" | "slug" | "sections" | "chapter"> & {
  readonly slug?: string
  readonly sections?: DraftSection[]
}
type DraftChapter = Omit<Chapter, "type" | "slug" | "pages"> & {
  readonly pages: DraftPage[]
}

const toc: DraftChapter[] = [
  {
    title: "Introduction",
    pages: [
      { title: "Get started", slug: "", sections: ["What to read next"] },
    ],
  },
]

function makeToc() {
  let result: Chapter[] = []

  for (let chapter of toc) {
    let chapterSlug = slug(chapter.title)

    let pages: Page[] = []
    for (let p of chapter.pages) {
      let pageSlug = p.slug ?? slug(p.title)

      let sections: Section[] | undefined = undefined
      if (p.sections !== undefined) {
        sections = []
        for (let s of p.sections) {
          let title
          let sectionSlug
          let subsections: Subsection[] | undefined = undefined
          if (typeof s === "string") {
            title = s
            sectionSlug = slug(title)
          } else {
            title = s.title
            sectionSlug = s.slug ?? slug(title)

            if (s.subsections !== undefined) {
              subsections = []
              for (let ss of s.subsections) {
                let title
                let subsectionSlug
                if (typeof ss === "string") {
                  title = ss
                  subsectionSlug = slug(title)
                } else {
                  title = ss.title
                  subsectionSlug = ss.slug ?? slug(title)
                }

                subsections.push({
                  title,
                  type: "subsection",
                  slug: subsectionSlug,
                  page: pageSlug,
                  section: sectionSlug,
                })
              }
            }
          }

          sections.push({
            title,
            type: "section",
            slug: sectionSlug,
            page: pageSlug,
            subsections,
          })
        }
      }

      pages.push({
        ...p,
        type: "page",
        slug: pageSlug,
        sections,
        chapter: chapterSlug,
      })
    }

    result.push({
      ...chapter,
      type: "chapter",
      slug: chapterSlug,
      pages,
    })
  }

  return result
}

function makeIndex(indexedToc: Chapter[]) {
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

export const Toc = makeToc()
export const Index = makeIndex(Toc)
