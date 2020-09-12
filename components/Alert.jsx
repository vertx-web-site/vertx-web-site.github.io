import classNames from "classnames"
import "./Alert.scss"

const Alert = ({ children, error, warning, info, title }) => (
  <div className={classNames("alert", { error, warning, info })}>
    {title && <div className="alert-title">{title}</div>}
    {children}
  </div>
)

export default Alert
