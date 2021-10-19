import Header from "../Header"
import TranslationHero from "../community/TranslationHero"
import Footer from "../Footer"
import styles from "./Community.scss?type=global"

const Layout = ({ children }) => (
  <main>
    <Header title="翻译团队"/>
    <TranslationHero />
    <div className="container community">
      {/*<div className="community-love">Eclipse Vert.x is made with ❤️ by the following people</div>*/}
      {children}
    </div>
    <Footer />
      <style jsx>{styles}</style>
  </main>
)

export default Layout
