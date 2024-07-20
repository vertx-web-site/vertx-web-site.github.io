import { IconProps } from "@phosphor-icons/react"
import clsx from "clsx"
import { ReactElement, ReactNode, cloneElement } from "react"

interface ButtonProps {
  icon?: ReactElement<IconProps>
  primary?: boolean
  children: ReactNode
}

const Button = ({ icon, primary, children }: ButtonProps) => (
  <button
    className={clsx(
      "flex cursor-pointer flex-row items-center gap-2 rounded-sm bg-gray-600 py-2 text-white transition-colors hover:bg-gray-700",
      icon ? "pl-6 pr-7" : "px-6",
      { "bg-primary hover:bg-primary-hover": primary },
    )}
  >
    {icon ? (
      <div>{cloneElement(icon, { ...icon.props, size: "1.25em" })}</div>
    ) : undefined}
    <div>{children}</div>
  </button>
)

export default Button
