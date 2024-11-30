import Faq from "./faq.mdx"
import Label from "@/components/Label"
import { Chapter, isExternal, makeIndex, makeToc } from "@/components/docs/Toc"
import VersionGuard from "@/components/docs/VersionGuard"
import { versionFromSlug } from "@/components/docs/versionFromSlug"
import {
  versions as docsVersions,
  latestRelease,
  metadata,
} from "@/docs/metadata/all"
import { filterLatestBugfixVersions } from "@/docs/metadata/helpers"
import PhosphorLink from "@phosphor-icons/core/regular/link.svg"
import {
  Book,
  CaretLeft,
  CaretRight,
  Paperclip,
} from "@phosphor-icons/react/dist/ssr"
import { Metadata, ResolvingMetadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"

declare module "react" {
  // enable CSS variables in style attributes
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}

const GetStarted = dynamic(() => import("./get-started.mdx"))
const IntroToReactive = dynamic(() => import("./intro-to-reactive.mdx"))

interface DocsPageProps {
  params: { slug: string[] }
}

export async function generateMetadata(
  { params }: DocsPageProps,
  _: ResolvingMetadata,
): Promise<Metadata> {
  let fullSlug = undefined
  if (params.slug !== undefined) {
    fullSlug = params.slug.join("/")
  } else {
    fullSlug = ""
  }

  let { type, version, slug } = versionFromSlug(fullSlug)

  let toc = makeToc(type, version ?? latestRelease.version)
  let index = makeIndex(toc)

  let entry = index[slug]

  return {
    title: entry.title,
  }
}

function findNeighbors(
  slug: string,
  toc: Chapter[],
): [string | undefined, string | undefined] {
  let last: string | undefined
  let prev: string | undefined
  let hasPrev = false
  for (let c of toc) {
    for (let p of c.pages) {
      if (isExternal(p.slug)) {
        continue
      }
      if (hasPrev) {
        return [prev, p.slug]
      }
      if (p.slug === slug) {
        hasPrev = true
        prev = last
      }
      last = p.slug
    }
  }
  return [prev, undefined]
}

export async function generateStaticParams() {
  let params = []

  let filteredVersions = filterLatestBugfixVersions(docsVersions)
  for (let version of filteredVersions) {
    // version index page
    params.push({
      slug: [version],
    })

    // add documentation
    let toc = makeToc("docs", version)
    for (let chapter of toc) {
      for (let page of chapter.pages) {
        if (isExternal(page.slug)) {
          // don't generate pages for external modules
          continue
        }

        let slug = page.slug.split("/")
        params.push({ slug: [version, ...slug] })

        // generate pages for latest version too
        if (latestRelease.version === version) {
          params.push({ slug })
        }
      }
    }

    // add howtos and guides
    for (let t of ["howtos", "guides"] as const) {
      let tt = makeToc(t, latestRelease.version)
      for (let chapter of tt) {
        for (let page of chapter.pages) {
          let slug = page.slug.split("/")
          params.push({ slug: [t, ...slug] })
        }
      }
    }
  }

  // add index page
  params.push({ slug: [] })

  return params
}

const DocsPage = async ({ params }: DocsPageProps) => {
  let fullSlug = undefined
  if (params.slug !== undefined) {
    fullSlug = params.slug.join("/")
  } else {
    fullSlug = ""
  }

  const { type, version, slug } = versionFromSlug(fullSlug)
  const activeVersion = version ?? latestRelease.version

  let toc = makeToc(type, activeVersion)
  let index = makeIndex(toc)

  let latestToc: ReturnType<typeof makeToc> | undefined
  let latestIndex: ReturnType<typeof makeIndex> | undefined
  if (activeVersion !== latestRelease.version) {
    latestToc = makeToc(type, latestRelease.version)
    latestIndex = makeIndex(latestToc)
  }

  let entry = index[slug]

  let label: string | undefined = undefined
  let parentChapter: Chapter | undefined = undefined
  let examples: string | undefined = undefined
  let includeApidocs = true
  if (entry.type === "page") {
    parentChapter = index[entry.chapter] as Chapter
    label = entry.label
    examples = entry.examples
    includeApidocs = entry.includeApidocs ?? true
  }

  let Content: () => JSX.Element
  if (slug === "") {
    Content = () => <GetStarted />
  } else if (slug === "intro-to-reactive") {
    Content = () => <IntroToReactive />
  } else if (slug === "faq") {
    Content = () => <Faq />
  } else {
    let sourcePath: string
    if (type === "howtos" || type === "guides") {
      sourcePath = `${slug}/java`
    } else if (slug === "") {
      sourcePath = activeVersion
    } else {
      sourcePath = `${activeVersion}/${slug}`
    }
    let contents = require(
      `../../../docs/compiled/${sourcePath}/index.html`,
    ).default

    let extendedh1 = undefined
    let match = contents.match(/<h1[^>]*>.*?<\/h1>/)
    if (match !== null) {
      let h1 = match[0]
      contents =
        contents.substring(0, match.index) +
        contents.substring(match.index + h1.length)
      extendedh1 = (
        <div className="mb-7 flex flex-row items-start gap-3">
          <span
            className="inline-flex [&_h1]:mb-0 [&_h1]:text-[2em] [&_h1]:font-normal [&_h1]:leading-9"
            dangerouslySetInnerHTML={{
              __html: h1,
            }}
          ></span>
          {label !== undefined ? (
            <div className="mt-1">
              <Label>{label}</Label>
            </div>
          ) : undefined}
        </div>
      )
    }

    Content = () => (
      <>
        {activeVersion !== latestRelease.version ? (
          <div className="mb-8 mt-5 text-pretty border-l-8 border-warning bg-bg-warning p-4 text-sm">
            {metadata.find(r => r.version === activeVersion)?.metadata
              ?.prerelease ? (
              <>
                You are currently viewing the documentation for the{" "}
                <em>unreleased</em> version <em>{activeVersion}</em> of Vert.x.{" "}
                {latestIndex?.[slug] !== undefined ? (
                  <>
                    Visit the{" "}
                    <Link className="font-normal" href={`/docs/${slug}`}>
                      latest stable version of this page
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Go to the{" "}
                    <Link className="font-normal" href="/docs">
                      latest stable version
                    </Link>
                    .
                  </>
                )}
              </>
            ) : (
              <>
                You are currently viewing the documentation for{" "}
                <em>Vert.x {activeVersion}</em>.{" "}
                {latestIndex?.[slug] !== undefined ? (
                  <>
                    Visit the{" "}
                    <Link className="font-normal" href={`/docs/${slug}`}>
                      latest version of this page
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Go to the{" "}
                    <Link className="font-normal" href="/docs">
                      latest version
                    </Link>
                    .
                  </>
                )}
              </>
            )}
          </div>
        ) : undefined}
        {extendedh1}
        <div
          dangerouslySetInnerHTML={{
            __html: contents,
          }}
        ></div>
      </>
    )
  }

  let [prev, next] = findNeighbors(slug, toc)

  let Main = (
    <>
      {parentChapter !== undefined ? (
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="font-normal text-primary">{parentChapter.title}</div>
          <div className="flex flex-row gap-4">
            {examples !== undefined ? (
              <Link
                href={examples}
                className="hidden flex-row items-center gap-1 xs:flex"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Paperclip />
                <div>Examples</div>
              </Link>
            ) : undefined}
            {includeApidocs ? (
              <Link
                href={
                  version !== undefined
                    ? `/docs/${version}/apidocs`
                    : "/docs/apidocs"
                }
                className="flex flex-row items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
              >
                <Book />
                <div>API docs</div>
              </Link>
            ) : undefined}
          </div>
        </div>
      ) : undefined}
      <div className="mt-2" id={slug}></div>
      <Content />
      <div className="mb-8 mt-14 flex justify-between gap-4 text-sm">
        <div>
          {prev !== undefined ? (
            <Link
              href={`/docs/${type === "howtos" || type === "guides" ? `${type}/` : ""}${version !== undefined ? `${version}/${prev}` : prev}`}
              className="group flex items-center gap-1 font-normal text-gray-800 hover:text-primary"
            >
              <div className="text-gray-500 group-hover:text-primary">
                <CaretLeft size="1em" />
              </div>
              <div>{index[prev].title}</div>
            </Link>
          ) : undefined}
        </div>
        <div>
          {next !== undefined ? (
            <Link
              href={`/docs/${type === "howtos" || type === "guides" ? `${type}/` : ""}${version !== undefined ? `${version}/${next}` : next}`}
              className="group flex items-center gap-1 text-right font-normal text-gray-800 hover:text-primary"
            >
              <div>{index[next].title}</div>
              <div className="text-gray-500 group-hover:text-primary">
                <CaretRight size="1em" />
              </div>
            </Link>
          ) : undefined}
        </div>
      </div>
    </>
  )

  return (
    <>
      <VersionGuard type={type} pageVersion={activeVersion} />
      <main
        className="docs-contents prose mt-40 lg:mt-24"
        style={{
          "--docs-contents-heading-link": `url("${PhosphorLink}")`,
        }}
      >
        {Main}
      </main>
    </>
  )
}

export default DocsPage
