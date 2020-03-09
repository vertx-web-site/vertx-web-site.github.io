import Header from "../Header";
import Footer from "../Footer";

const Layout = props => (
  <main>
    <Header title={props.meta.title}/>
    {props.children}
    <Footer />
  </main>
);

export default Layout;
