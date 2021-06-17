import classNames from "classnames"
import styles from "./Button.scss?type=global"

const Button = ({ children, primary }) => (
  <div className={classNames("button", { primary })}>
    {children}
    <style jsx>{styles}</style>
  </div>
)

export default Button
