import { IconProps } from "@phosphor-icons/react"
import clsx from "clsx"
import { ReactElement, ReactNode, cloneElement } from "react"

interface ButtonProps {
  icon?: ReactElement<IconProps>
  primary?: boolean
  className?: string
  children: ReactNode
}

const Button = ({ icon, primary, className, children }: ButtonProps) => (
  <button
    className={clsx(
      "flex cursor-pointer flex-row items-center gap-2 rounded-sm py-2 text-bg transition-all dark:[box-shadow:inset_0px_0px_0px_2px_var(--tw-shadow-color)]",
      icon ? "pl-6 pr-7" : "px-6",
      {
        "bg-primary hover:bg-primary-hover dark:bg-primary/10 dark:text-gray-700 dark:shadow-primary dark:hover:bg-primary-hover/15 dark:hover:text-gray-900 dark:hover:shadow-primary-hover":
          primary,
        "bg-gray-600 hover:bg-gray-700 dark:bg-gray-600/0 dark:text-gray-500 dark:shadow-gray-500 dark:hover:text-gray-800 dark:hover:shadow-gray-800":
          !primary,
      },
      className,
    )}
  >
    {icon ? (
      <div>{cloneElement(icon, { ...icon.props, size: "1.25em" })}</div>
    ) : undefined}
    <div>{children}</div>
  </button>
)

export default Button
