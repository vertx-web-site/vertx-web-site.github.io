import Layout from "../../components/layouts/BlogPost"
import BlogDate from "../../components/blog/BlogDate"
import BlogEntry from "../../components/blog/BlogEntry"
import POSTS from "../../components/blog/get-all-posts"

import { Clock } from "react-feather"

import Facebook from "@icons-pack/react-simple-icons/lib/Facebook"
import Linkedin from "@icons-pack/react-simple-icons/lib/Linkedin"
import Twitter from "@icons-pack/react-simple-icons/lib/Twitter"

export async function getStaticPaths() {
  let paths = POSTS.map(p => ({ params: { slug: p.slug } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const fs = require("fs").promises
  const readingTime = require("reading-time")

  let post = POSTS.find(p => p.slug === params.slug)
  let source = await fs.readFile(`blog/${post.filename}`, "utf-8")
  let stats = readingTime(source)

  return {
    props: {
      ...post,
      readingTime: stats
    }
  }
}

export default ({ filename, date, slug, readingTime }) => {
  let post = require(`../../blog/${filename}`)
  let PostComponent = post.default

  let postIndex = POSTS.findIndex(p => p.slug === slug)
  let prevPost
  let nextPost
  if (postIndex > 0) {
    prevPost = POSTS[postIndex - 1]
  }
  if (postIndex < POSTS.length - 1) {
    nextPost = POSTS[postIndex + 1]
  }

  let url = `${process.env.baseUrl}/blog/${slug}`

  return (
    <Layout meta={{ title: `${post.meta.title} | Blog` }}>
      <div className="blog-post-main">
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
          <div className="blog-post-sidebar-reading-time"><Clock className="feather" /> {readingTime.text}</div>
          <div className="blog-post-sidebar-share-icons">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.meta.title)}&url=${encodeURIComponent(url)}&via=vertx_project`}
                target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </a>
            <a href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
          </div>
        </div>
      </div>

      <div className="blog-post-next-prev">
        <div className="blog-post-next-prev-entry">
          {prevPost && (<>
            <h5>Next post</h5>
            <BlogEntry post={prevPost} />
          </>)}
        </div>

        <div className="blog-post-next-prev-entry">
        </div>

        <div className="blog-post-next-prev-entry">
          {nextPost && (<>
            <h5>Previous post</h5>
            <BlogEntry post={nextPost} />
          </>)}
        </div>
      </div>

      <div className="blog-post-related">
        <h5>Related posts</h5>
        <div className="blog-post-related-posts">
          <BlogEntry post={POSTS[2]} />
          <BlogEntry post={POSTS[3]} />
          <BlogEntry post={POSTS[4]} />
        </div>
      </div>
    </Layout>
  )
}
