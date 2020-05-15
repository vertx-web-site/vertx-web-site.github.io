import Layout from "../../components/layouts/BlogPost"
import BlogDate from "../../components/blog/BlogDate"
import POSTS from "../../components/blog/get-all-posts"

export async function getStaticPaths() {
  let paths = POSTS.map(p => ({ params: { slug: p.slug } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let post = POSTS.find(p => p.slug === params.slug)
  return {
    props: post
  }
}

export default ({ filename, date }) => {
  let post = require(`../../blog/${filename}`)
  let PostComponent = post.default

  return (
    <Layout meta={{ title: `${post.meta.title} | Blog` }}>
      <div className="blog-post-content">
        <PostComponent />
      </div>
      <div className="blog-post-sidebar">
        {post.meta.authors.map(author => (
          <div className="blog-post-author" key={author.github_id}>
            <img className="blog-post-author-avatar"
              src={`https://github.com/${author.github_id}.png?size=160`} />
            <div className="blog-post-author-name">
              {post.meta.authors.length === 1 && "by "}<a href={`https://github.com/${author.github_id}`}
                target="_blank" rel="noopener noreferrer">{author.name}</a>
            </div>
          </div>
        ))}
        <div className="blog-post-sidebar-date">Posted on <BlogDate date={date} /></div>
        in <a className="blog-post-sidebar-category">{post.meta.category}</a>
      </div>
    </Layout>
  )
}
