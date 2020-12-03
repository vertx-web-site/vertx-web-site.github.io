import Button from "../Button"
import MainCodeExamples from "./MainCodeExamples"
import "./Hero.scss"
import GitHubStars from "../GitHubStars"
import { ArrowUpCircle, FastForward } from "react-feather"
import Link from "next/link"
import { versions } from "../../docs/metadata/all"

const Hero = () => (
  <section className="hero">
    <div className="hero-background" />
    <div className="hero-main container">
      <div className="hero-left">
        <div className="hero-slogan">
          <span className="hero-product-name">Eclipse Vert.x<span className="hero-product-name-separator"> |</span></span> Reactive applications on the JVM
        </div>
        <div className="hero-buttons">
          <Link href="/get-started/">
            <a><Button primary><FastForward className="feather" /> Get started with v{versions[0]}</Button></a>
          </Link>
          <GitHubStars org="eclipse-vertx" repo="vert.x" button />
        </div>
        <div className="hero-buttons hero-buttons-second">
          <Link href="/from-vert-x-3-to-vert-x-4/">
            <a><Button primary><ArrowUpCircle className="feather" /> Migrate from Vert.x 3</Button></a>
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <MainCodeExamples />
      </div>
    </div>
  </section>
)

export default Hero
