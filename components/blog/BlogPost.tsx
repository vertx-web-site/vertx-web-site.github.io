import allPosts from "@/.generated/allposts.json"

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

  return (
    <>
      <main className="prose">
        <Content />
      </main>
    </>
  )
}

export default BlogPost
