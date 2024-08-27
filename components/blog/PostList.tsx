import Pagination from "./Pagination"
import allPosts from "@/.generated/allposts.json"
import Avatar from "boring-avatars"
import clsx from "clsx"
import dayjs from "dayjs"
import Link from "next/link"

interface PostListProps {
  posts: typeof allPosts
  height: "medium" | "large"
}

const PostList = ({ posts, height }: PostListProps) => {
  return (
    <>
      {posts.map(p => (
        <Link
          href={`/blog/${p.slug}`}
          key={p.slug}
          className={clsx(
            "flex flex-col justify-between rounded-sm border border-gray-200 p-6 transition-colors hover:border-gray-600",
            {
              "min-h-[17rem] sm:min-h-[14rem] lg:min-h-[16rem]":
                height === "medium",
              "min-h-[21rem] sm:min-h-[19rem] lg:min-h-[20.5rem] xl:min-h-[21rem]":
                height === "large",
            },
          )}
        >
          <div>
            <h3 className="mb-3 mt-0 line-clamp-2 overflow-ellipsis text-balance text-2xl font-normal text-primary">
              {p.title}
            </h3>
            <div
              dangerouslySetInnerHTML={{ __html: p.summaryHtml }}
              className={clsx("overflow-ellipsis", {
                "line-clamp-3": height === "medium",
                "line-clamp-5": height === "large",
              })}
            ></div>
          </div>
          <div className="flex flex-row items-center gap-2 text-sm text-gray-600">
            <div>
              {p.authors.length === 1 ? (
                <img
                  src={`https://github.com/${p.authors[0].github_id}.png?size=40`}
                  srcSet={`https://github.com/${p.authors[0].github_id}.png?size=40, https://github.com/${p.authors[0].github_id}.png?size=80 2x`}
                  alt={`${p.authors[0].name}'s profile image`}
                  width="80px"
                  height="80px"
                  className="h-[2.25rem] w-[2.25rem] rounded-full border border-gray-200"
                />
              ) : (
                <Avatar
                  size="2.25rem"
                  name={p.authors.map(a => a.name).join(", ")}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="line-clamp-1 overflow-ellipsis">
                {p.authors.map(a => a.name).join(", ")}
              </div>
              <div className="flex flex-row gap-2">
                <div className="line-clamp-1 overflow-ellipsis">
                  {dayjs(p.date).format("D MMMM YYYY")}
                </div>
                <div className="font-normal uppercase">#{p.category}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  )
}

export default PostList
