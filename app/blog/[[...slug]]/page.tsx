import allPosts from "@/.generated/allposts.json"
import BlogIndex from "@/components/blog/BlogIndex"
import BlogPost from "@/components/blog/BlogPost"
import { Rss } from "@phosphor-icons/react/dist/ssr"
import { startCase } from "lodash"
import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { ReactNode } from "react"

const POSTS_PER_PAGE = 9

interface BlogProps {
  params: { slug?: string[] }
}

function postsByCategory(): Map<string, any[]> {
  let result = new Map<string, any[]>()
  for (let p of allPosts) {
    if (!result.has(p.category)) {
      result.set(p.category, [])
    }
    result.get(p.category)?.push(p)
  }
  return result
}

function parseSlug(slug: string[] | undefined): {
  category: string | undefined
  page: number | undefined
  postId: string | undefined
} {
  let category: string | undefined = undefined

  if (slug !== undefined && slug.length > 1 && slug[0] === "category") {
    category = slug[1]
    slug = slug.slice(2)
  }

  let page: number | undefined = undefined
  if (slug === undefined || slug.length === 0) {
    page = 1
  } else if (slug !== undefined && slug.length > 1 && slug[0] === "page") {
    page = +slug[1]
    slug = slug.slice(2)
  }

  let postId: string | undefined = undefined
  if (slug !== undefined && slug.length > 0) {
    postId = slug[0]
  }

  return { category, page, postId }
}

export async function generateMetadata(
  { params }: BlogProps,
  _: ResolvingMetadata,
): Promise<Metadata> {
  let { category, page, postId } = parseSlug(params.slug)

  let c = []
  let result: Metadata = {}
  if (postId === undefined && page !== undefined) {
    if (category !== undefined) {
      c.push(startCase(category))
    }
    if (page > 1) {
      c.push(`Page ${page}`)
    }
  } else if (postId !== undefined) {
    let post = allPosts.find(p => p.slug === postId)
    if (post !== undefined) {
      c.push(post.title)
      result.metadataBase = new URL(process.env.baseUrl!)
      result.openGraph = {
        images: [
          {
            url: `/images/previews/${post.slug}.jpg`,
            width: 1600,
            height: 836,
            alt: "Vert.x",
          },
        ],
      }
    }
  }
  c.push("Blog")

  result.title = c.join(" | ")

  return result
}

export async function generateStaticParams() {
  let paths: { slug: string[] }[] = []

  // add pages for all posts except
  // * those from the 'releases' category
  // * pinned posts
  let filteredPosts = allPosts.filter(
    p => p.category !== "releases" && p.pinned !== true,
  )
  let pages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  for (let i = 0; i < pages; ++i) {
    if (i === 0) {
      paths.push({
        slug: [],
      })
    } else {
      paths.push({
        slug: ["page", `${i + 1}`],
      })
    }
  }

  // add pages for each category
  let pbc = postsByCategory()
  pbc.forEach((postsInCategory, category) => {
    let pagesInCategory = Math.ceil(postsInCategory.length / POSTS_PER_PAGE)
    for (let i = 0; i < pagesInCategory; ++i) {
      if (i === 0) {
        paths.push({
          slug: ["category", category],
        })
      } else {
        paths.push({
          slug: ["category", category, "page", `${i + 1}`],
        })
      }
    }
  })

  // add each post
  for (let p of allPosts) {
    paths.push({
      slug: [p.slug],
    })
  }

  return paths
}

const Blog = ({ params }: BlogProps) => {
  let { category, page, postId } = parseSlug(params.slug)

  let allCategories = new Set<string>()
  for (let p of allPosts) {
    allCategories.add(p.category)
  }

  let content: ReactNode
  if (postId === undefined && page !== undefined) {
    content = (
      <BlogIndex
        page={page}
        category={category}
        postsPerPage={POSTS_PER_PAGE}
      />
    )
  } else if (postId !== undefined) {
    content = <BlogPost postId={postId} />
  } else {
    throw new Error("Illegal parameter set")
  }

  return (
    <>
      <div className="prose mb-8 flex flex-row flex-wrap items-baseline justify-between gap-x-10">
        <h1>
          Blog
          {category !== undefined ? (
            <>&#x2002;/&#x2002;{startCase(category)}</>
          ) : undefined}
        </h1>
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 uppercase md:gap-8">
          <Link href="/blog" className="font-normal">
            All posts
          </Link>
          {Array.from(allCategories).map(c => (
            <Link key={c} href={`/blog/category/${c}`} className="font-normal">
              {c}
            </Link>
          ))}
          <Link href="/feed/atom.xml">
            <Rss size="1.25em" />
          </Link>
        </div>
      </div>
      {content}
    </>
  )
}

export default Blog
