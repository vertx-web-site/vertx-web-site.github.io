import clsx from "clsx"
import { ReactNode } from "react"

interface AlertProps {
  error?: boolean
  warning?: boolean
  info?: boolean
  title?: string
  children: ReactNode
}

const Alert = ({ children, error, warning, info, title }: AlertProps) => (
  <div
    className={clsx(
      "my-4 border-l-8 bg-gray-100 px-4 py-3 [&_p:first-child]:mt-0 [&_p]:mb-0 [&_p]:mt-2",
      {
        "border-alert": error,
        "border-primary": warning || info,
      },
    )}
  >
    {title && <div className="font-medium">{title}</div>}
    {children}
  </div>
)

export default Alert
