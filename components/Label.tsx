import clsx from "clsx"
import { ReactNode } from "react"

interface LabelProps {
  children: ReactNode
  type?: "transparent" | "primary"
}

const Label = ({ children, type = "primary" }: LabelProps) => {
  return (
    <span
      className={clsx(
        "rounded-sm border px-[0.6em] py-[0.3em] text-[0.75em] font-normal leading-tight",
        {
          "border-primary bg-primary text-bg": type === "primary",
          "border-gray-200 text-gray-700": type === "transparent",
        },
      )}
    >
      {children}
    </span>
  )
}

export default Label
