"use client"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { useIsApple } from "./hooks/useIsApple"
import clsx from "clsx"
import { forwardRef } from "react"

interface ScrollBarProps {
  orientation: "vertical" | "horizontal"
  type: ScrollAreaPrimitive.ScrollAreaProps["type"]
  forceDark: boolean
}

const ScrollBar = ({ orientation, type, forceDark }: ScrollBarProps) => {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={clsx(
        "flex touch-none select-none p-0.5 [transition:opacity_160ms_ease-out,width_.25s_ease-in-out,height_.25s_ease-in-out] data-[orientation=horizontal]:h-[0.6rem] data-[orientation=vertical]:w-[0.6rem] data-[orientation=horizontal]:flex-col hover:data-[orientation=horizontal]:h-[0.8rem] hover:data-[orientation=vertical]:w-[0.8rem]",
        {
          dark: forceDark,
          "opacity-0 data-[state=visible]:opacity-60": type !== "always",
          "opacity-60": type === "always",
        },
      )}
      forceMount={true}
      aria-hidden={true}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-gray-800 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

interface ScrollAreaProps {
  className?: string
  orientation?: "vertical" | "horizontal" | "both"
  nonAppleType?: ScrollAreaPrimitive.ScrollAreaProps["type"]
  forceDark?: boolean
  children: React.ReactNode
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      orientation = "both",
      nonAppleType = "hover",
      forceDark = false,
      children,
    },
    ref,
  ) => {
    const isApple = useIsApple()
    const hideDelay =
      isApple === undefined || isApple === false
        ? nonAppleType === "scroll"
          ? undefined
          : 0
        : undefined
    const type =
      isApple === undefined || isApple === false ? nonAppleType : "scroll"

    return (
      <ScrollAreaPrimitive.Root
        className={clsx("overflow-hidden", className)}
        scrollHideDelay={hideDelay}
        type={type}
      >
        <ScrollAreaPrimitive.Viewport className="h-full w-full" ref={ref}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        {orientation !== "horizontal" ? (
          <ScrollBar orientation="vertical" type={type} forceDark={forceDark} />
        ) : undefined}
        {orientation !== "vertical" ? (
          <ScrollBar
            orientation="horizontal"
            type={type}
            forceDark={forceDark}
          />
        ) : undefined}
      </ScrollAreaPrimitive.Root>
    )
  },
)

export default ScrollArea
