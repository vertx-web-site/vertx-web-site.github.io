import { useEffect, useState } from "react"

export function useUserAgent() {
  const [userAgent, setUserAgent] = useState<string | undefined>(undefined)

  useEffect(() => {
    setUserAgent(window.navigator.userAgent)
  }, [])

  return userAgent
}
