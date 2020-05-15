import Link from "next/link"
import "./BlogNavBar.scss"

export default () => (
  <div className="blog-navbar">
    <h2>Blog</h2>
    <ul>
      <li><Link href="/blog/"><a>All posts</a></Link></li>
      <li><a href="#">Releases</a></li>
      <li><a href="#">Guides</a></li>
      <li><a href="#">User stories</a></li>
    </ul>
  </div>
)
