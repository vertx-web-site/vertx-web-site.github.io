import clsx from "clsx"

interface ButtonProps {
  icon?: React.ReactNode
  primary?: boolean
  children: React.ReactNode
}

const Button = ({ icon, primary, children }: ButtonProps) => (
  <button
    className={clsx(
      "flex cursor-pointer flex-row items-center gap-2 rounded-sm bg-gray-600 py-2 text-white transition-colors hover:bg-gray-700",
      icon ? "pl-6 pr-7" : "px-6",
      { "bg-primary hover:bg-primary-hover": primary },
    )}
  >
    {icon ? <div>{icon}</div> : undefined}
    <div>{children}</div>
  </button>
)

export default Button
