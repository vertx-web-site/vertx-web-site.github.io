import Page from "./Page"
import "./GetStarted.scss"

export default (props) => (
  <Page narrow {...props}>
    <div className="get-started">
      {props.children}
    </div>
  </Page>
)
