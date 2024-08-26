import allPosts from "@/.generated/allposts.json"
import dayjs from "dayjs"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

interface PostListProps {
  posts: typeof allPosts
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <>
      {posts.map(p => (
        <Link
          href={`/blog/${p.slug}`}
          key={p.slug}
          className="rounded-sm border border-gray-200 p-6 transition-colors hover:border-gray-600"
        >
          <h3 className="mb-2 mt-0 text-2xl font-normal text-primary">
            <Balancer ratio={0.5}>{p.title}</Balancer>
          </h3>
          <div className="text-gray-600">
            {dayjs(p.date).format("D MMMM YYYY")}
          </div>
          <div dangerouslySetInnerHTML={{ __html: p.summaryHtml }}></div>
        </Link>
      ))}
    </>
  )
}

export default PostList
