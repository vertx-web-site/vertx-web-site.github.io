import Page from "./Page"
import BlogNavBar from "../blog/BlogNavBar"
import styles from "./BlogPost.scss?type=global"

const BlogPost = (props) => (
  <Page hashSmoothScroll {...props}>
    <div className="blog-post">
      <BlogNavBar categories={props.categories} />
      {props.children}
    </div>
    <style jsx>{styles}</style>
  </Page>
)

export default BlogPost
