"use client"

import Hero from "../components/hero/Hero"
import Features from "../components/index/Features.mdx"
import Book from "@/components/index/Book"

const Page = () => {
  return (
    <main>
      <Hero />
      <Features />
      <hr className="mb-20 mt-28 border-gray-300" />
      <Book />
      <hr className="mb-20 mt-28 border-gray-300" />
    </main>
  )
}

export default Page
