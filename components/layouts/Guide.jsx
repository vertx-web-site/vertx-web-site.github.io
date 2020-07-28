import Page from "./Page"
import "./Guide.scss"

export default (props) => (
  <Page narrow hashSmoothScroll {...props}>
    <div className="guide">
      {props.children}
    </div>
  </Page>
)
