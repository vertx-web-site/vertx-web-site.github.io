import Link from "next/link"
import BlogDate from "./BlogDate"
import ReadMoreLink from "../ReadMoreLink"
import "./BlogEntry.scss"

const BlogEntry = ({ post }) => {
  let authors = post.meta.authors.map(a => {
    return (
      <li key={a.github_id}>
        <img src={`https://github.com/${a.github_id}.png?size=50`} />
        <a href={`https://github.com/${a.github_id}`}
          target="_blank" rel="noopener noreferrer">{a.name}</a>
      </li>
    )
  })

  return (
    <div className="blog-entry">
      <div className="blog-entry-meta">
        <span className="blog-entry-date"><BlogDate date={post.date} /></span>
        <Link href="/blog/[[...slug]]" as={`/blog/category/${post.meta.category}/`}>
          <a className="blog-entry-category">{post.meta.category}</a>
        </Link>
      </div>
      <h3>
        <Link href="/blog/[[...slug]]" as={`/blog/${post.slug}/`}>
          <a>{post.meta.title}</a>
        </Link>
      </h3>
      <span className="blog-entry-authors"><ul>{authors}</ul></span>
      <p className="blog-entry-summary">
        {post.meta.summary || "*** PLEASE SPECIFY A MEANINGFUL SUMMARY ***"}
      </p>
      <ReadMoreLink href="/blog/[[...slug]]" as={`/blog/${post.slug}/`} />
    </div>
  )
}

export default BlogEntry
