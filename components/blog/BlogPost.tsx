import Label from "../Label"
import { Tooltip } from "../Tooltip"
import PostListItem from "./PostListItem"
import allPosts from "@/.generated/allposts.json"
import {
  Clock,
  FacebookLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import Link from "next/link"
import fs from "node:fs/promises"

interface BlogPostProps {
  postId: string
}

async function getRelatedPosts(postId: string) {
  let content = await fs.readFile(
    `./.generated/relatedposts/${postId}.json`,
    "utf-8",
  )
  return JSON.parse(content)
}

const BlogPost = async ({ postId }: BlogPostProps) => {
  let post = allPosts.find(p => p.slug === postId)
  if (!post) {
    throw new Error(`Post not found: ${postId}`)
  }

  let Content = require(
    `@/blog/${post.filename.substring(post.filename.lastIndexOf("/") + 1)}.mdx`,
  ).default

  let url = `${process.env.baseUrl}/blog/${post.slug}`

  let relatedPosts = await getRelatedPosts(postId)

  return (
    <>
      <main className="prose grid grid-cols-1 gap-10 xl:[grid-template-columns:1fr_18rem]">
        <div className="min-w-0 border-t border-gray-200 pt-16">
          <div className="mb-9 flex flex-row flex-wrap items-center justify-between gap-4">
            <h1 className="mb-0 inline-block text-pretty text-4xl">
              {post.title}
            </h1>
            {post.pinned && <Label>Pinned post</Label>}
          </div>
          <Content />
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pt-16 xl:items-start">
          {post.authors.map(author => (
            <div
              key={author.github_id}
              className="mb-3 flex flex-row items-center gap-4"
            >
              <img
                src={`https://github.com/${author.github_id}.png?size=72`}
                srcSet={`https://github.com/${author.github_id}.png?size=72, https://github.com/${author.github_id}.png?size=144 2x`}
                width={144}
                height={144}
                alt={`${author.name}'s profile image`}
                className="my-0 h-16 w-16 rounded-full border border-gray-200"
              />
              <div className="text-lg leading-none">
                {post.authors.length === 1 && "by "}
                <a
                  href={`https://github.com/${author.github_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal"
                >
                  {author.name}
                </a>
              </div>
            </div>
          ))}
          <div className="mt-6">
            Posted on{" "}
            <span className="font-normal">
              {dayjs(post.date).format("D MMMM YYYY")}
            </span>
          </div>
          <div>
            in{" "}
            <Link
              href={`/blog/category/${post.category}`}
              className="font-normal uppercase"
            >
              {post.category}
            </Link>
          </div>
          <div className="my-6 flex flex-row items-center gap-2">
            <Clock size="1.5em" className="-ml-[2px]" />
            <div>{post.readingTime}</div>
          </div>
          <div className="-ml-[0.2rem] flex flex-row gap-3">
            <Tooltip content="X">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}&via=vertx_project`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 transition-all hover:scale-110"
              >
                <XLogo size="1.75em" />
              </a>
            </Tooltip>
            <Tooltip content="LinkedIn">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 transition-all hover:scale-110"
              >
                <LinkedinLogo size="1.75em" />
              </a>
            </Tooltip>
            <Tooltip content="Facebook">
              <a
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 transition-all hover:scale-110"
              >
                <FacebookLogo size="1.75em" />
              </a>
            </Tooltip>
          </div>
        </div>
      </main>

      <section
        id="next-prev-posts"
        className="mt-20 border-t border-gray-200 pb-12 pt-12"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <div>
            {relatedPosts.nextPost !== undefined ? (
              <>
                <h2 className="mb-6 mt-6 text-balance text-center text-xl font-normal">
                  Next post
                </h2>
                <PostListItem post={relatedPosts.nextPost} height={"large"} />
              </>
            ) : undefined}
          </div>

          <div className="hidden xl:block">{/* Placeholder */}</div>

          <div>
            {relatedPosts.prevPost !== undefined ? (
              <>
                <h2 className="mb-6 mt-6 text-balance text-center text-xl font-normal">
                  Previous post
                </h2>
                <PostListItem post={relatedPosts.prevPost} height={"large"} />
              </>
            ) : undefined}
          </div>
        </div>
      </section>

      <section id="next-prev-posts" className="pb-12 xl:pt-4">
        <h2 className="mb-6 text-balance text-center text-xl font-normal">
          Related posts
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {relatedPosts.relatedPosts.map((p: any) => (
            <div key={p.slug} className="last:hidden last:xl:block">
              <PostListItem post={p} height={"large"} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default BlogPost
