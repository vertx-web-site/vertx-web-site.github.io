import { useUserAgent } from "./useUserAgent"
import { useEffect, useState } from "react"

export function useIsMobile() {
  const userAgent = useUserAgent()
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (userAgent === undefined) {
      return
    }
    setIsMobile(/Android|iPhone|iPad|Mobile|Tablet/i.test(userAgent))
  }, [userAgent])

  return isMobile
}
