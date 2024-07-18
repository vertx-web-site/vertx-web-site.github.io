import Page from "./Page"
import BlogNavBar from "../blog/BlogNavBar"
import styles from "./Blog.scss?type=global"

const Blog = (props) => (
  <Page {...props}>
    <div className="blog">
      <BlogNavBar categories={props.categories} />
      {props.children}
    </div>
    <style jsx>{styles}</style>
  </Page>
)

export default Blog
