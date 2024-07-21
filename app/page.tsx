"use client"

import Footer from "@/components/Footer"
import Hero from "@/components/hero/Hero"
import Book from "@/components/index/Book"
import Features from "@/components/index/Features.mdx"
import Logos from "@/components/index/Logos"

const Page = () => {
  return (
    <main>
      <Hero />
      <Features />
      <hr className="mb-20 mt-28 border-gray-300" />
      <Book />
      <hr className="mb-20 mt-28 border-gray-300" />
      <Logos />
      <Footer />
    </main>
  )
}

export default Page
