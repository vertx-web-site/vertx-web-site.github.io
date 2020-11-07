import classNames from "classnames"
import { Children, cloneElement, useState } from "react"
import "./CodeExamples.scss"

const CodeExamples = ({ wide, children } ) => {
  let titles = Children.map(children, c => c.props.title)

  const [active, setActive] = useState(titles[0])

  return (
    <div className={classNames("code-examples", { wide })}>
      <div className="code-examples-tabs">
        {titles.map(title => (
          <div className={classNames("code-examples-tab", { active: active === title })}
            onClick={() => setActive(title)} key={title}>{title}</div>
        ))}
      </div>
      <div className="code-examples-content">
        {Children.map(children, child => cloneElement(child, {
          active: active === child.props.title
        }))}
      </div>
    </div>
  )
}

export default CodeExamples
