"use client"

import { useEffect } from "react"

interface ResizeObserverProps {
  onResize: () => void
}

const ResizeObserver = ({ onResize }: ResizeObserverProps) => {
  useEffect(() => {
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [onResize])
  return <></>
}

export default ResizeObserver
