import { latestRelease } from "../../docs/metadata/all"
import Button from "../Button"
import MainCodeExamples from "./MainCodeExamples"
import { ArrowCircleUp, FastForward } from "@phosphor-icons/react"
import Link from "next/link"

interface HeroProps {}

const Hero = ({}: HeroProps) => (
  <section>
    {/* background */}
    <div
      className={`absolute -z-10 h-[900px] w-full max-w-full bg-[url(${process.env.__NEXT_ROUTER_BASEPATH}/images/hero-background.svg)] bg-cover bg-center bg-no-repeat md:-top-52 lg:-top-32 xl:-top-24`}
    />
    {/* main content */}
    <div className="mx-auto mb-20 mt-40 flex max-w-screen-xl flex-row justify-between">
      {/* left side */}
      <div className="max-w-[580px]">
        {/* slogan */}
        <div className="text-[2.8rem] font-light leading-tight">
          <span className="font-medium text-black">
            Eclipse Vert.x
            <span className="font-light">&trade;</span>
          </span>{" "}
          Reactive{" "}
          <span className="tracking-[0.001em] [word-spacing:0.04em]">
            applications on the JVM
          </span>
        </div>
        {/* buttons */}
        <div className="mt-6">
          <div className="flex flex-row gap-2">
            <Link href="/get-started/">
              <Button primary icon={<FastForward />}>
                Get started
              </Button>
            </Link>
            <Link href="/blog/from-vert-x-3-to-vert-x-4/">
              <Button icon={<ArrowCircleUp />}>Migrate from v3</Button>
            </Link>
          </div>
          <div className="mt-1 text-sm text-gray-700">
            <span className="font-normal">Latest release:</span> v
            {latestRelease.version}
            {/* <GitHubStars
            org="eclipse-vertx"
            repo="vert.x"
            button
            fallbackValue={gitHubStarsFallbackValue}
          /> */}
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="w-[570px]">
        <MainCodeExamples />
      </div>
    </div>
  </section>
)

export default Hero
