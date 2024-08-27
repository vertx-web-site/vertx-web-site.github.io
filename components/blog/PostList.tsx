import PostListItem from "./PostListItem"
import allPosts from "@/.generated/allposts.json"

interface PostListProps {
  posts: typeof allPosts
  height: "medium" | "large"
}

const PostList = ({ posts, height }: PostListProps) => {
  return (
    <>
      {posts.map(p => (
        <PostListItem key={p.slug} post={p} height={height} />
      ))}
    </>
  )
}

export default PostList
