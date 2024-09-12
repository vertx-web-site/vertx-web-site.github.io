import Container from "@/components/Container"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"

const ResourcesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Container width="xl" className="mt-24">
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default ResourcesLayout
