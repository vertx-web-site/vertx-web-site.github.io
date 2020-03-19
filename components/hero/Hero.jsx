import Button from "../Button";
import CodeExamples from "./CodeExamples";
import "./Hero.scss";
import GitHubStarsButton from "./GitHubStarsButton";
import { FastForward } from "react-feather";

export default () => (
  <section className="hero">
    <div className="hero-background" />
    <div className="hero-main container">
      <div className="hero-left">
        <div className="hero-slogan">
          <span className="hero-product-name">Eclipse Vert.x |</span> Reactive applications on the JVM
        </div>
        <div className="hero-buttons">
          <Button href="#" primary><FastForward className="feather" /> Get started</Button>
          <GitHubStarsButton />
        </div>
      </div>
      <div className="hero-right">
        <CodeExamples />
      </div>
    </div>
  </section>
);
