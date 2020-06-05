import Guide from "./Guide"
import "./Faq.scss"

export default (props) => (
    <Guide {...props}>
      <div className="faq">
        {props.children}
      </div>
    </Guide>
)
