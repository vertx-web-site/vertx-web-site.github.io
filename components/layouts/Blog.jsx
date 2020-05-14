import Page from "./Page"
import "./Blog.scss"

export default (props) => (
  <Page {...props}>
    <div className="blog">
      {props.children}
    </div>
  </Page>
)
