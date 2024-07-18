import classNames from "classnames"
import styles from "./Label.scss?type=global"

const Label = (({ small, tiny, nowrap, dark, children }) => {
  return <div className={classNames("label", { small, tiny, nowrap, dark })}>
    {children}
    <style jsx>{styles}</style>
  </div>
})

export default Label
