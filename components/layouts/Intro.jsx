import Guide from "./Guide"
import "./Intro.scss"

export default (props) => (
  <Guide {...props}>
    <div className="intro">
      {props.children}
    </div>
  </Guide>
)
