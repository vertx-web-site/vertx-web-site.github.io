import clsx from "clsx"
import { ReactElement, ReactNode, useState } from "react"

interface CodeExampleProps {
  title: string
  children: ReactNode
}

interface CodeExamplesProps {
  wide?: boolean
  smallText?: boolean
  children: ReactElement<CodeExampleProps> | ReactElement<CodeExampleProps>[]
}

export const CodeExample = ({ children }: CodeExampleProps) => <>{children}</>

const CodeExamples = ({
  wide = false,
  smallText = false,
  children,
}: CodeExamplesProps) => {
  const childrenArr = Array.isArray(children) ? children : [children]
  const [active, setActive] = useState(childrenArr[0].props.title)

  return (
    <div>
      <div className="flex flex-row text-white">
        {childrenArr.map((ex, i) => (
          <div
            className={clsx(
              "cursor-pointer select-none px-6 py-2 text-sm",
              active === ex.props.title
                ? "bg-bg-code"
                : "bg-bg-code-tab-inactive hover:bg-bg-code-tab-hover",
              {
                "rounded-tl-sm": i === 0,
                "rounded-tr-sm": i === childrenArr.length - 1,
                "flex-1 text-center": wide,
              },
            )}
            onClick={() => setActive(ex.props.title)}
            key={ex.props.title}
          >
            {ex.props.title}
          </div>
        ))}
      </div>
      <div
        className={clsx("overflow-auto rounded-b-sm bg-bg-code p-2", {
          "text-sm": smallText,
          "rounded-tr-sm": !wide,
        })}
      >
        {childrenArr.map(ex => (
          <div
            key={ex.props.title}
            className={active === ex.props.title ? "block" : "hidden"}
          >
            {ex}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodeExamples
