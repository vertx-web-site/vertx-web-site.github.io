import Page from "./Page"
import styles from "./Guide.scss"

const Guide = (props) => (
  <Page narrow hashSmoothScroll {...props}>
    {/* put <style> at the beginning so we can override it in {props.children} */}
    <style jsx>{styles}</style>
    <div className="guide">
      {props.children}
    </div>
  </Page>
)

export default Guide
