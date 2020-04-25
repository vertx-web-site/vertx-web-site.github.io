import Header from "../Header"
import Hero from "../hero/Hero"
import Footer from "../Footer"
import Book from "../index/Book"
import Logos from "../index/Logos"

const Layout = ({ meta = {}, children }) => (
  <main>
    <Header title={meta.title}/>
    <Hero />
    <div className="container">
      {children}
    </div>
    <Logos />
    <Book />
    <Footer />
  </main>
)

export default Layout
