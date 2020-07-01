import Button from "../Button"
import MainCodeExamples from "./MainCodeExamples"
import "./Hero.scss"
import GitHubStarsButton from "./GitHubStarsButton"
import { FastForward } from "react-feather"
import Link from "next/link"

export default () => (
  <section className="hero">
    <div className="hero-background" />
    <div className="hero-main container">
      <div className="hero-left">
        <div className="hero-slogan">
          <span className="hero-product-name">Eclipse Vert.x<span className="hero-product-name-separator"> |</span></span> Reactive applications on the JVM
        </div>
        <div className="hero-buttons">
          <Link href="/get-started/">
            <a><Button primary><FastForward className="feather" /> Get started with v4.0.0</Button></a>
          </Link>
          <GitHubStarsButton />
        </div>
      </div>
      <div className="hero-right">
        <MainCodeExamples />
      </div>
    </div>
  </section>
)
