import Content from "./download.mdx"
import Container from "@/components/Container"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Download",
}

const Download = () => {
  return (
    <>
      <NavBar />
      <Container className="prose" width="md">
        <main className="mt-24">
          <Content />
        </main>
      </Container>
      <Footer />
    </>
  )
}

export default Download
