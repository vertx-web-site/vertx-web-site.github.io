import Page from "./Page"
import BlogNavBar from "../blog/BlogNavBar"
import "./Blog.scss"

const Blog = (props) => (
  <Page {...props}>
    <div className="blog">
      <BlogNavBar categories={props.categories} />
      {props.children}
    </div>
  </Page>
)

export default Blog
