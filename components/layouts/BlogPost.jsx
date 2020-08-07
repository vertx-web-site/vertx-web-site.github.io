import Page from "./Page"
import BlogNavBar from "../blog/BlogNavBar"
import "./BlogPost.scss"

const BlogPost = (props) => (
  <Page hashSmoothScroll {...props}>
    <div className="blog-post">
      <BlogNavBar categories={props.categories} />
      {props.children}
    </div>
  </Page>
)

export default BlogPost
