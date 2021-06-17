import Page from "./Page"
import styles from "./Guide.scss?type=global"

const Guide = (props) => (
  <Page narrow hashSmoothScroll {...props}>
    <div className="guide">
      {props.children}
    </div>
    <style jsx>{styles}</style>
  </Page>
)

export default Guide
