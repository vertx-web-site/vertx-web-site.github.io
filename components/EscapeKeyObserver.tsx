"use client"

import { useHotkeys } from "react-hotkeys-hook"

interface EscapeKeyObserverProps {
  onEscape: () => void
}

const EscapeKeyObserver = ({ onEscape }: EscapeKeyObserverProps) => {
  useHotkeys("esc", () => onEscape())
  return <></>
}

export default EscapeKeyObserver
