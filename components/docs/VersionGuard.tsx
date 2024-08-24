"use client"

import { useVersion } from "../hooks/useVersion"
import { useEffect } from "react"

interface VersionGuardProps {
  pageVersion: string
}

const VersionGuard = ({ pageVersion }: VersionGuardProps) => {
  const { version, setVersion } = useVersion()

  // automatically update store based on the version of the current page
  useEffect(() => {
    if (pageVersion !== version) {
      setVersion(pageVersion)
    }
  }, [pageVersion, version, setVersion])

  return <></>
}

export default VersionGuard
