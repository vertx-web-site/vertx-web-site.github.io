import Layout from "../../components/layouts/Blog"
import Link from "next/link"
import POSTS from "../../components/blog/get-all-posts"

function postToEntry(post) {
  let p = require(`../../blog/${post.filename}`)
  let format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
  let dateParts = format.formatToParts(new Date(post.date))
  let date = dateParts.find(p => p.type === "day").value + " " +
    dateParts.find(p => p.type === "month").value + " " +
    dateParts.find(p => p.type === "year").value

  let authors = p.meta.authors.map(a => {
    return (
      <li key={a.github_id}>
        <img src={`https://github.com/${a.github_id}.png?size=50`} />
        <a href={`https://github.com/${a.github_id}`}>{a.name}</a>
      </li>
    )
  })

  return (
    <div key={post.slug} className="blog-post-entry">
      <div className="blog-post-meta">
        <span className="blog-post-date">{date}</span> <span className="blog-post-category">{p.meta.category}</span>
      </div>
      <h3>
        <Link href="/blog/[slug]" as={`/blog/${post.slug}/`}>
          <a>{p.meta.title}</a>
        </Link>
      </h3>
      <span className="blog-post-authors"><ul>{authors}</ul></span>
      <p className="blog-post-excerpt">
        Lorem ipsum dolor sit amet, con­sectetuer adip­isc­ing elit, sed diam non­ummy nibh eu­is­mod tin­cidunt ut laoreet do­lore magna ali­quam erat vo­lut­pat. Ut wisi enim ad.
      </p>
      <span className="blog-post-read-more-link">
        <Link href="/blog/[slug]" as={`/blog/${post.slug}/`}>
          <a>Read more</a>
        </Link>
      </span>
    </div>
  )
}

const ENTRIES = POSTS.map(postToEntry)

export default () => {
  return (
    <Layout meta={{ title: "Blog" }}>
      <div className="blog-navbar">
        <ul>
          <li><Link href="/blog/"><a>All posts</a></Link></li>
          <li><a href="#">Releases</a></li>
          <li><a href="#">Guides</a></li>
          <li><a href="#">User stories</a></li>
        </ul>
      </div>
      <div className="blog-post-entries">
        {ENTRIES}
      </div>
    </Layout>
  )
}
