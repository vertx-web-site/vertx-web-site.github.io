import Page from "./Page"
import "./Faq.scss"

export default (props) => (
  <Page {...props}>
    <div className="faq">
      {props.children}
    </div>
  </Page>
)
