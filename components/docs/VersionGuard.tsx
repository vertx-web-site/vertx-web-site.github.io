"use client"

import { useVersion } from "../hooks/useVersion"
import { useEffect } from "react"

interface VersionGuardProps {
  type: "docs" | "howtos" | "guides"
  pageVersion: string
}

const VersionGuard = ({ type, pageVersion }: VersionGuardProps) => {
  const { version, setVersion } = useVersion()

  // automatically update store based on the version of the current page
  useEffect(() => {
    if (type === "docs" && pageVersion !== version) {
      setVersion(pageVersion)
    }
  }, [pageVersion, version, setVersion])

  return <></>
}

export default VersionGuard
