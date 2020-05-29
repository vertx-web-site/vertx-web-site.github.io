import Page from "./Page"
import BlogNavBar from "../blog/BlogNavBar"
import "./Blog.scss"

export default (props) => (
  <Page {...props}>
    <div className="blog">
      <BlogNavBar categories={props.categories} />
      {props.children}
    </div>
  </Page>
)
