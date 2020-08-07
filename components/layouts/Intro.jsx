import Guide from "./Guide"
import "./Intro.scss"

const Intro = (props) => (
  <Guide {...props}>
    <div className="intro">
      {props.children}
    </div>
  </Guide>
)

export default Intro
