import Header from "../Header";
import Footer from "../Footer";
import "./Page.scss";

const Layout = props => (
  <main>
    <Header title={props.meta.title}/>
    <div className="page">
      <div className="container">
        {props.children}
      </div>
    </div>
    <Footer />
  </main>
);

export default Layout;
