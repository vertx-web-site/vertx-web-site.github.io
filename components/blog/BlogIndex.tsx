import PostList from "./PostList"
import allPosts from "@/.generated/allposts.json"
import dayjs from "dayjs"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

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
      <div className="prose flex flex-row justify-between">
        <div>
          <h1>Blog</h1>
        </div>
      </div>
      {pinnedPosts !== undefined ? (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h2 className="mb-4 text-xl font-normal">Pinned posts</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12">
            <PostList posts={pinnedPosts} />
          </div>
        </div>
      ) : undefined}
      {releasesPosts !== undefined ? (
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h2 className="mb-4 text-xl font-normal">Latest releases</h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-12">
            <PostList posts={releasesPosts} />
          </div>
        </div>
      ) : undefined}
      <div className="grid grid-cols-3 gap-x-4 gap-y-12">
        <PostList posts={pagePosts} />
      </div>
    </main>
  )

  return <></>
}

export default BlogIndex
