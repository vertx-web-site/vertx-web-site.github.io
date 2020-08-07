import Link from "next/link"
import BlogDate from "./BlogDate"
import ReadMoreLink from "../ReadMoreLink"
import "./BlogEntry.scss"

const BlogEntry = ({ post }) => {
  let p = require(`../../blog/${post.filename}`)

  let authors = p.meta.authors.map(a => {
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
        <Link href="/blog/[[...slug]]" as={`/blog/category/${p.meta.category}/`}>
          <a className="blog-entry-category">{p.meta.category}</a>
        </Link>
      </div>
      <h3>
        <Link href="/blog/[[...slug]]" as={`/blog/${post.slug}/`}>
          <a>{p.meta.title}</a>
        </Link>
      </h3>
      <span className="blog-entry-authors"><ul>{authors}</ul></span>
      <p className="blog-entry-summary">
        {p.meta.summary || "Lorem ipsum dolor sit amet, con­sectetuer adip­isc­ing elit, sed diam non­ummy nibh eu­is­mod tin­cidunt ut laoreet do­lore magna ali­quam erat vo­lut­pat. Ut wisi enim ad."}
      </p>
      <ReadMoreLink href="/blog/[[...slug]]" as={`/blog/${post.slug}/`} />
    </div>
  )
}

export default BlogEntry
