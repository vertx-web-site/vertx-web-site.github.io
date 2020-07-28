import Page from "./Page"
import BlogNavBar from "../blog/BlogNavBar"
import "./BlogPost.scss"

export default (props) => (
  <Page hashSmoothScroll {...props}>
    <div className="blog-post">
      <BlogNavBar categories={props.categories} />
      {props.children}
    </div>
  </Page>
)
