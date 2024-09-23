import ScrollArea from "../ScrollArea"
import { useIsApple } from "../hooks/useIsApple"
import { useIsMobile } from "../hooks/useIsMobile"
import clsx from "clsx"
import { forwardRef } from "react"

interface SidebarProps {
  className?: string
  sticky?: boolean
  children: React.ReactNode
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, sticky = true, children }, ref) => {
    const isApple = useIsApple()
    const isMobile = useIsMobile()

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
        {/* !!! Performance: Use native scroll area on Apple and mobile devices.
            Radix UI's ScrollArea performs very poorly in Safari and causes
            unwanted reflows (layout recalculations). */}
        {isApple || isMobile ? (
          <div ref={ref} className="max-h-full w-full overflow-auto text-sm">
            {children}
          </div>
        ) : (
          <ScrollArea ref={ref} className="max-h-full w-full text-sm">
            {children}
          </ScrollArea>
        )}
      </div>
    )
  },
)

export default Sidebar
