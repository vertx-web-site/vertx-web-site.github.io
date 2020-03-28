import Header from "../Header";
import Footer from "../Footer";
import Search from "../docs/Search";
import "./Docs.scss";

const Layout = props => (
  <main className="page docs">
    <Header title={props.meta.title}/>
    <div className="page-content docs-content">
      <div className="container">
        <Search />
        {props.children}
      </div>
    </div>
    <Footer />
  </main>
);

export default Layout;
