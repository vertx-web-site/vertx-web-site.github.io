import Header from "../Header";
import Hero from "../hero/Hero";
import Footer from "../Footer";
import Logos from "../index/Logos";

const Layout = props => (
  <main>
    <Header title={props.meta.title}/>
    <Hero />
    <div className="container">
      {props.children}
    </div>
    <Logos />
    <Footer />
  </main>
);

export default Layout;
