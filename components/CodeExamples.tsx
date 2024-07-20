import clsx from "clsx"
import { ReactNode, useState } from "react"

interface Example {
  title: string
  content: ReactNode
}

interface CodeExamplesProps {
  wide?: boolean
  smallText?: boolean
  examples: Example[]
}

const CodeExamples = ({
  wide = false,
  smallText = false,
  examples,
}: CodeExamplesProps) => {
  const [active, setActive] = useState(examples[0].title)

  return (
    <div>
      <div className="flex flex-row text-white">
        {examples.map((ex, i) => (
          <div
            className={clsx(
              "cursor-pointer select-none px-6 py-2 text-sm",
              active === ex.title
                ? "bg-bg-code"
                : "bg-bg-code-tab-inactive hover:bg-bg-code-tab-hover",
              {
                "rounded-tl-sm": i === 0,
                "rounded-tr-sm": i === examples.length - 1,
                "flex-1 text-center": wide,
              },
            )}
            onClick={() => setActive(ex.title)}
            key={ex.title}
          >
            {ex.title}
          </div>
        ))}
      </div>
      <div
        className={clsx("rounded-b-sm bg-bg-code p-2", {
          "text-sm": smallText,
          "rounded-tr-sm": !wide,
        })}
      >
        {examples.map(ex => (
          <div
            key={ex.title}
            className={active === ex.title ? "block" : "hidden"}
          >
            {ex.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodeExamples
