import ScrollArea from "../ScrollArea"
import clsx from "clsx"
import { forwardRef } from "react"

interface SidebarProps {
  className?: string
  sticky?: boolean
  children: React.ReactNode
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, sticky = true, children }, ref) => {
    return (
      <div
        className={clsx(
          "w-full",
          {
            "sticky top-0 max-h-screen": sticky,
            "flex max-h-full": !sticky,
          },
          className,
        )}
      >
        <ScrollArea ref={ref} className="max-h-full w-full text-sm">
          {children}
        </ScrollArea>
      </div>
    )
  },
)

export default Sidebar
