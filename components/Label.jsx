import classNames from "classnames"
import "./Label.scss"

const Label = (({ small, tiny, nowrap, children }) => {
  return <div className={classNames("label", { small, tiny, nowrap })}>{children}</div>
})

export default Label
