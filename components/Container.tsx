import clsx from "clsx"
import { ReactNode } from "react"

interface ContainerProps {
  id?: string
  className?: string
  children: ReactNode
  width?: "md" | "xl" | "2xl"
}

const Container = ({
  id = undefined,
  className,
  children,
  width = "xl",
}: ContainerProps) => {
  return (
    <div id={id} className="px-4 md:px-6">
      <div
        className={clsx(
          "mx-auto",
          {
            "max-w-screen-2xl": width === "2xl",
            "max-w-screen-xl": width === "xl",
            "max-w-screen-md": width === "md",
          },
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
