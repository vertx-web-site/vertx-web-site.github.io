import Layout from "../../components/layouts/Blog"
import BlogEntry from "../../components/blog/BlogEntry"
import POSTS from "../../components/blog/get-all-posts"

const ENTRIES = POSTS.map(p => <BlogEntry key={p.slug} post={p} />)

export default () => {
  return (
    <Layout meta={{ title: "Blog" }}>
      <div className="blog-entries">
        {ENTRIES}
      </div>
    </Layout>
  )
}
