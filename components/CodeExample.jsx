import classNames from "classnames"
import styles from "./CodeExample.scss?type=global"

// title attribute is used in CodeExamples.jsx
// eslint-disable-next-line no-unused-vars
const CodeExample = (({ title, active, children }) => {
  return (
    <div className={classNames("code-examples-example", { active })}>
      {children}
      <style jsx>{styles}</style>
    </div>
  )
})

export default CodeExample
