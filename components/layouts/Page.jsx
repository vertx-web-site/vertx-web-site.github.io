import classNames from "classnames"
import Header from "../Header"
import Footer from "../Footer"
import "./Page.scss"

const Layout = ({ meta, narrow, children }) => (
  <main className="page">
    <Header title={meta.title}/>
    <div className="page-content">
      <div className={classNames("container", { "container-narrow": narrow })}>
        {children}
      </div>
    </div>
    <Footer />
  </main>
)

export default Layout
