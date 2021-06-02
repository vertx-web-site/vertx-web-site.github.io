import Button from "../Button"
import MainCodeExamples from "./MainCodeExamples"
import "./Hero.scss"
import GitHubStars from "../GitHubStars"
import { ArrowUpCircle, FastForward } from "react-feather"
import Link from "next/link"
import { latestRelease } from "../../docs/metadata/all"

const Hero = ({ gitHubStarsFallbackValue }) => (
  <section className="hero">
    <div className="hero-background" />
    <div className="hero-main container">
      <div className="hero-left">
        <div className="hero-slogan">
          <span className="hero-product-name">Eclipse Vert.x<span className="hero-product-name-trademark">&trade;</span></span> Reactive <span className="hero-slogan-second-line">applications on the JVM</span>
        </div>
        <div className="hero-buttons">
          <Link href="/get-started/">
            <a><Button primary><FastForward className="feather" /> Get started with v{latestRelease.version}</Button></a>
          </Link>
          <GitHubStars org="eclipse-vertx" repo="vert.x" button fallbackValue={gitHubStarsFallbackValue} />
        </div>
        <div className="hero-buttons hero-buttons-second">
          <Link href="/blog/from-vert-x-3-to-vert-x-4/">
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
