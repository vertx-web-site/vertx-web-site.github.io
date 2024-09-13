import Pagination from "./Pagination"
import PostList from "./PostList"
import allPosts from "@/.generated/allposts.json"
import { Article, Package, PushPin } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

interface BlogIndexProps {
  category?: string
  page: number
  postsPerPage: number
}

const BlogIndex = ({ category, page, postsPerPage }: BlogIndexProps) => {
  let posts =
    category !== undefined
      ? allPosts.filter(p => p.category === category)
      : allPosts.filter(p => p.category !== "releases" && p.pinned !== true)

  let releasesPosts: typeof allPosts | undefined = undefined
  if (category === undefined && page === 1) {
    releasesPosts = allPosts
      .filter(p => p.category === "releases" && p.pinned !== true)
      .slice(0, 3)
  }

  let pinnedPosts: typeof allPosts | undefined = undefined
  if (category === undefined && page === 1) {
    pinnedPosts = allPosts.filter(p => p.pinned === true)
  }

  let totalPages = Math.ceil(posts.length / postsPerPage)

  // get posts for current page
  let pagePosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage)

  return (
    <main>
      {pinnedPosts !== undefined ? (
        <div className="mb-20 mt-8">
          <h2 className="mb-6 flex flex-row items-center gap-2 text-xl font-normal dark:text-gray-800">
            <PushPin size="1.75em" />
            <div>Pinned posts</div>
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 lg:gap-y-12">
            <PostList posts={pinnedPosts} height="medium" />
          </div>
        </div>
      ) : undefined}
      {releasesPosts !== undefined ? (
        <div className="mb-20">
          <h2 className="mb-6 flex flex-row items-center gap-2 text-xl font-normal dark:text-gray-800">
            <Package size="1.75em" />
            <div>Latest releases</div>
          </h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-y-12">
            <PostList posts={releasesPosts} height="large" />
          </div>
          <div className="prose mt-4 text-right">
            <Link href="/blog/category/releases">See all releases »</Link>
          </div>
        </div>
      ) : undefined}
      {pinnedPosts !== undefined || releasesPosts !== undefined ? (
        <h2 className="mb-6 flex flex-row items-center gap-2 text-xl font-normal dark:text-gray-800">
          <Article size="1.75em" />
          <div>Other posts</div>
        </h2>
      ) : undefined}
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-y-12">
        <PostList posts={pagePosts} height="large" />
      </div>
      {totalPages > 1 ? (
        <div className="mt-8 flex justify-center">
          <Pagination page={page} totalPages={totalPages} category={category} />
        </div>
      ) : undefined}
    </main>
  )
}

export default BlogIndex
