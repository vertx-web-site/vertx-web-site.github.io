import Header from "../Header"
import Hero from "../hero/Hero"
import Footer from "../Footer"
import Features from "../index/Features.mdx"
import Book from "../index/Book"
import Logos from "../index/Logos"

const Layout = ({ meta = {}, gitHubStarsFallbackValue }) => (
  <main>
    <Header title={meta.title}/>
    <Hero gitHubStarsFallbackValue={gitHubStarsFallbackValue} />
    <div className="container">
      <Features />
    </div>
    <Book />
    <Logos />
    <Footer />
  </main>
)

export default Layout
