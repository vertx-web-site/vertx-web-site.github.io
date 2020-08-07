import Guide from "./Guide"
import "./GetStarted.scss"

const GetStarted = (props) => (
  <Guide {...props}>
    <div className="get-started">
      {props.children}
    </div>
  </Guide>
)

export default GetStarted
