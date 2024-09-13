"use client"

import clsx from "clsx"
import { ReactElement, ReactNode, useState } from "react"

interface CodeExampleProps {
  title: string
  children: ReactNode
}

interface CodeExamplesProps {
  wide?: boolean
  smallText?: boolean
  shadow?: boolean
  children: ReactElement<CodeExampleProps> | ReactElement<CodeExampleProps>[]
}

export const CodeExample = ({ children }: CodeExampleProps) => <>{children}</>

const CodeExamples = ({
  wide = false,
  smallText = false,
  shadow = false,
  children,
}: CodeExamplesProps) => {
  const childrenArr = Array.isArray(children) ? children : [children]
  const [active, setActive] = useState(childrenArr[0].props.title)

  return (
    <div>
      <div
        className={clsx(
          "inline-flex flex-row text-white dark:overflow-hidden dark:rounded-t-sm dark:border-l dark:border-r dark:border-t dark:border-bg-code",
          { "dark:shadow-xl dark:shadow-black/20": shadow },
        )}
      >
        {childrenArr.map((ex, i) => (
          <div
            className={clsx(
              "cursor-pointer select-none px-6 py-2 text-sm",
              active === ex.props.title
                ? "bg-bg-code"
                : "bg-bg-code-tab-inactive hover:bg-bg-code-tab-hover",
              {
                "rounded-tl-sm dark:rounded-none": i === 0,
                "rounded-tr-sm dark:rounded-none": i === childrenArr.length - 1,
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
        className={clsx("rounded-b-sm bg-bg-code", {
          "text-sm": smallText,
          "rounded-tr-sm": !wide,
          "dark:shadow-xl dark:shadow-black/20": shadow,
        })}
      >
        {childrenArr.map(ex => (
          <div
            key={ex.props.title}
            className={clsx(
              "[&_pre]:m-2",
              active === ex.props.title ? "flex" : "hidden",
              {
                // Avoid flickering when dark theme is enabled in production
                // mode. This basically hides the shadow of the tabs which
                // otherwise overlaps the code.
                "relative z-10 bg-bg-code": shadow,
              },
            )}
          >
            {ex}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodeExamples
