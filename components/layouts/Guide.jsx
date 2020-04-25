import Page from "./Page"
import "./Guide.scss"

export default (props) => (
  <Page narrow {...props}>
    <div className="guide">
      {props.children}
    </div>
  </Page>
)
