import classNames from "classnames"
import "./Button.scss"

const Button = ({ children, primary }) => (
  <div className={classNames("button", { primary })}>{children}</div>
)

export default Button
