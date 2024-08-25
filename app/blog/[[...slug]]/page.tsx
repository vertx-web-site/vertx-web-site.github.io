import allPosts from "@/.generated/allposts.json"
import ScrollTopWorkaround from "@/components/ScrollTopWorkaround"
import dayjs from "dayjs"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

const POSTS_PER_PAGE = 6

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

export async function generateStaticParams() {
  let paths: { slug: string[] }[] = []

  // add pages for all posts (regardless of their category)
  let pages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
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
  let slug = params.slug
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

  let post_id: string | undefined = undefined
  if (slug !== undefined && slug.length > 0) {
    post_id = slug[0]
  }

  if (post_id === undefined && page !== undefined) {
    let posts =
      category !== undefined
        ? allPosts.filter(p => p.category === category)
        : allPosts

    let totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

    // get posts for current page
    let pagePosts = posts.slice(
      (page - 1) * POSTS_PER_PAGE,
      page * POSTS_PER_PAGE,
    )

    return (
      <div>
        {pagePosts.map(p => (
          <div key={p.slug} className="border-b-4 border-gray-200 pb-8">
            <h2 className="not-prose mb-2 mt-0 text-2xl">
              <Balancer ratio={0.5}>
                <Link href={`/blog/${p.slug}`} className="hover:text-gray-600">
                  {p.title}
                </Link>
              </Balancer>
            </h2>
            <div className="text-gray-600">
              {dayjs(p.date).format("D MMMM YYYY")}
            </div>
            <div dangerouslySetInnerHTML={{ __html: p.summaryHtml }}></div>
            &raquo; <Link href={`/blog/${p.slug}`}>Keep reading</Link>
          </div>
        ))}
      </div>
    )
  } else if (post_id !== undefined) {
    let post = allPosts.find(p => p.slug === post_id)
    if (!post) {
      throw new Error(`Post not found: ${post_id}`)
    }

    let Content = require(
      `@/blog/${post.filename.substring(
        post.filename.lastIndexOf("/") + 1,
      )}.mdx`,
    ).default

    return (
      <>
        <ScrollTopWorkaround />
        <main className="prose">
          <Content />
        </main>
      </>
    )
  } else {
    throw new Error("Illegal parameter set")
  }
}

export default Blog
