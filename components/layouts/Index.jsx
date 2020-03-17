import Header from "../Header";
import Hero from "../hero/Hero";
import Footer from "../Footer";

const Layout = props => (
  <main>
    <Header title={props.meta.title}/>
    <Hero />
    <div className="container">
      {props.children}
    </div>
    <Footer />
  </main>
);

export default Layout;
