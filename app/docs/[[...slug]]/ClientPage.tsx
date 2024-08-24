"use client"

import GetStarted from "./get-started.mdx"
import IntroToReactive from "./intro-to-reactive.mdx"

interface ClientPageProps {
  page: "get-started" | "intro-to-reactive"
}

// Wraps MDX components. They require "use client".
const ClientPage = ({ page }: ClientPageProps) => {
  switch (page) {
    case "get-started":
      return <GetStarted />
    case "intro-to-reactive":
      return <IntroToReactive />
  }
}

export default ClientPage
