"use client"

import * as Tooltip from "@radix-ui/react-tooltip"

// This is a thin wrapper around Tooltip.Provider from @radix-ui/react-tooltip
// that adds the "use client" directive so the tooltip provider can be used
// in server components.

interface ClientTooltipProviderProps {
  children: React.ReactNode
}

const ClientTooltipProvider = ({ children }: ClientTooltipProviderProps) => {
  return <Tooltip.Provider>{children}</Tooltip.Provider>
}

export default ClientTooltipProvider
