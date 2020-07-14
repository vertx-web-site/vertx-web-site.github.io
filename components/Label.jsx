import classNames from "classnames"
import "./Label.scss"

const Label = (({ small, nowrap, children }) => {
  return <div className={classNames("label", { small, nowrap })}>{children}</div>
})

export default Label
