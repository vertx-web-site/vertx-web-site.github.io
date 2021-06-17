import Guide from "./Guide"
import styles from "./Intro.scss?type=global"

const Intro = (props) => (
  <Guide {...props}>
    <div className="intro">
      {props.children}
    </div>
    <style jsx>{styles}</style>
  </Guide>
)

export default Intro
