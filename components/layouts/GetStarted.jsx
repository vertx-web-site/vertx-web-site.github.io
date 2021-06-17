import Guide from "./Guide"
import styles from "./GetStarted.scss?type=global"

const GetStarted = (props) => (
  <Guide {...props}>
    <div className="get-started">
      {props.children}
    </div>
    <style jsx>{styles}</style>
  </Guide>
)

export default GetStarted
