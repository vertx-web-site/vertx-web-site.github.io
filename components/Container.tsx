import clsx from "clsx"
import { ReactNode } from "react"

interface ContainerProps {
  className?: string
  children: ReactNode
  width?: "md" | "xl"
}

const Container = ({ className, children, width = "xl" }: ContainerProps) => {
  return (
    <div className="px-4 md:px-6">
      <div
        className={clsx(
          "mx-auto",
          width === "xl" ? "max-w-screen-xl" : "max-w-screen-md",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
