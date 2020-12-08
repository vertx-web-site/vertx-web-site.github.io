import classNames from "classnames"
import "./Label.scss"

const Label = (({ small, tiny, nowrap, dark, children }) => {
  return <div className={classNames("label", { small, tiny, nowrap, dark })}>{children}</div>
})

export default Label
