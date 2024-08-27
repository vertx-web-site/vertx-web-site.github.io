import Label from "../Label"
import SimpleIcon from "../SimpleIcon"
import { Tooltip } from "../Tooltip"
import allPosts from "@/.generated/allposts.json"
import { Clock } from "@phosphor-icons/react/dist/ssr"
import dayjs from "dayjs"
import Link from "next/link"
import { siFacebook, siLinkedin, siX } from "simple-icons"

interface BlogPostProps {
  postId: string
}

const BlogPost = ({ postId }: BlogPostProps) => {
  let post = allPosts.find(p => p.slug === postId)
  if (!post) {
    throw new Error(`Post not found: ${postId}`)
  }

  let Content = require(
    `@/blog/${post.filename.substring(post.filename.lastIndexOf("/") + 1)}.mdx`,
  ).default

  let url = `${process.env.baseUrl}/blog/${post.slug}`

  return (
    <>
      <main className="prose grid grid-cols-1 gap-10 xl:[grid-template-columns:1fr_18rem]">
        <div className="min-w-0 border-t border-gray-200 pt-16">
          <div className="mb-9 flex flex-row flex-wrap items-center justify-between gap-4">
            <h1 className="mb-0 inline-block text-balance text-4xl">
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
          <div className="not-prose flex flex-row gap-3">
            <Tooltip content="X">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}&via=vertx_project`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <SimpleIcon icon={siX} title="" />
              </a>
            </Tooltip>
            <Tooltip content="LinkedIn">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <SimpleIcon icon={siLinkedin} title="" />
              </a>
            </Tooltip>
            <Tooltip content="Facebook">
              <a
                href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <SimpleIcon icon={siFacebook} title="" />
              </a>
            </Tooltip>
          </div>
        </div>
      </main>
    </>
  )
}

export default BlogPost
