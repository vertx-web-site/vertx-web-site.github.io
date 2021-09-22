import Button from "../Button"
import MainCodeExamples from "./MainCodeExamples"
import styles from "./Hero.scss?type=global"
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
          <span className="hero-product-name">Eclipse Vert.x<span className="hero-product-name-trademark">&trade;</span></span><span className="hero-slogan-second-line">JVM上的响应式应用</span>
        </div>
        <div className="hero-buttons">
          <Link href="/get-started/">
            <a><Button primary><FastForward /> 从 v{latestRelease.version} 开始</Button></a>
          </Link>
          <GitHubStars org="eclipse-vertx" repo="vert.x" button fallbackValue={gitHubStarsFallbackValue} />
        </div>
        <div className="hero-buttons hero-buttons-second">
          <Link href="/blog/from-vert-x-3-to-vert-x-4/">
            <a><Button primary><ArrowUpCircle /> 从 Vert.x 3迁移</Button></a>
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <MainCodeExamples />
      </div>
    </div>
    <style jsx>{styles}</style>
  </section>
)

export default Hero
