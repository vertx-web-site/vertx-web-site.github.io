import Page from "./Page"
import "./Guide.scss"

const Guide = (props) => (
  <Page narrow hashSmoothScroll {...props}>
    <div className="guide">
      {props.children}
    </div>
  </Page>
)

export default Guide
