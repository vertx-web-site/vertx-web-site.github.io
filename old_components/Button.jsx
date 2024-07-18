import classNames from "classnames"
import styles from "./Button.scss"

const Button = ({ icon, primary, children }) => (
  <div className={classNames("button", { primary })}>
    {icon && <div className="icon">{icon}</div>} {children}
    <style jsx>{styles}</style>
  </div>
)

export default Button
