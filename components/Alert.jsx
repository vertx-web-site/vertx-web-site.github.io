import classNames from "classnames"
import styles from "./Alert.scss?type=global"

const Alert = ({ children, error, warning, info, title }) => (
  <div className={classNames("alert", { error, warning, info })}>
    {title && <div className="alert-title">{title}</div>}
    {children}
    <style jsx>{styles}</style>
  </div>
)

export default Alert
