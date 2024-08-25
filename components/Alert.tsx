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
  <div className={clsx("alert", { error, warning, info })}>
    {title && <div className="alert-title">{title}</div>}
    {children}
  </div>
)

export default Alert
