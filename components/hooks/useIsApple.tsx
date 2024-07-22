"use client"

import { useUserAgent } from "./useUserAgent"
import { useEffect, useState } from "react"

export function useIsApple() {
  const userAgent = useUserAgent()
  const [isApple, setIsApple] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (userAgent === undefined) {
      return
    }
    setIsApple(/Mac|iPhone|iPad/i.test(userAgent))
  }, [userAgent])

  return isApple
}
