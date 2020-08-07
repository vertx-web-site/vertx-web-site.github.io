import Link from "next/link"
import "./BlogNavBar.scss"

const BlogNavBar = ({ categories }) => (
  <div className="blog-navbar">
    <h2>Blog</h2>
    <ul>
      <li><Link href="/blog/"><a>All posts</a></Link></li>
      {categories.map(c => (
        <li key={c}>
          <Link href="/blog/[...slug]" as={`/blog/category/${c}/`}>
            <a>{c}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default BlogNavBar
