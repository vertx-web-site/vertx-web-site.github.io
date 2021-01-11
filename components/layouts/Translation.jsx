import Header from "../Header"
import TranslationHero from "../community/TranslationHero"
import Footer from "../Footer"
import "./Community.scss"

const Layout = ({ children }) => (
  <main>
    <Header title="Community"/>
    <TranslationHero />
    <div className="container community">
      {/*<div className="community-love">Eclipse Vert.x is made with ❤️ by the following people</div>*/}
      {children}
    </div>
    <Footer />
  </main>
)

export default Layout
