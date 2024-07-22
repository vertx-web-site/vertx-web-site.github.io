import * as TooltipPrimitive from "@radix-ui/react-tooltip"

interface TooltipProps {
  children?: React.ReactNode
  content: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  delay?: number
}

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delay,
  ...props
}: TooltipProps & Omit<TooltipPrimitive.TooltipContentProps, "content">) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delay}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        side="top"
        align="center"
        className="select-none rounded-sm bg-gray-800 px-2 py-1 text-sm text-gray-100 [&[data-state='closed']]:animate-fade-out [&[data-state='delayed-open']]:animate-fade-in"
        collisionPadding={5}
        {...props}
      >
        {content}
        <TooltipPrimitive.Arrow
          width={13}
          height={7}
          className="fill-gray-800"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  )
}
