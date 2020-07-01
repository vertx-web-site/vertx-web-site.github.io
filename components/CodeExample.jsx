import classNames from "classnames"
import "./CodeExample.scss"

// title attribute is used in CodeExamples.jsx
// eslint-disable-next-line no-unused-vars
const CodeExample = (({ title, active, children }) => {
  return (
    <div className={classNames("code-examples-example", { active })}>
      {children}
    </div>
  )
})

export default CodeExample
