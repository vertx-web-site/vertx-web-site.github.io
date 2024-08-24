import { latestRelease } from "../../docs/metadata/all"
import Button from "../Button"
import Container from "../Container"
import MainCodeExamples from "./MainCodeExamples"
import { ArrowCircleUp, FastForward } from "@phosphor-icons/react"
import Link from "next/link"
import Balancer, { Provider } from "react-wrap-balancer"

interface HeroProps {}

const Hero = ({}: HeroProps) => (
  <section>
    <Provider>
      {/* background */}
      <div
        className="absolute -top-20 -z-10 h-[900px] w-full max-w-full bg-cover bg-center bg-no-repeat sm:-top-28 md:-top-24"
        style={{
          backgroundImage: `url(${process.env.__NEXT_ROUTER_BASEPATH}/images/hero-background.svg)`,
        }}
      />
      {/* main content */}
      <Container className="mb-20 mt-16 flex flex-row justify-between md:mt-20">
        {/* left side */}
        <div className="mx-auto max-w-3xl text-center xl:mx-0 xl:max-w-[580px] xl:text-left">
          {/* slogan */}
          <div className="text-[2.8rem] font-light leading-tight">
            <span className="mb-4 block font-medium text-black xl:mb-0 xl:inline-block">
              Eclipse Vert.x
              <span className="font-light">&trade;</span>
            </span>{" "}
            <span className="hidden xl:inline">
              Reactive{" "}
              <span className="xl:tracking-[0.001em] xl:[word-spacing:0.04em]">
                applications on the JVM
              </span>
            </span>
            <span className="text-[2.4rem] xl:hidden">
              <Balancer>Reactive applications on the JVM</Balancer>
            </span>
          </div>
          {/* buttons */}
          <div className="mt-8 flex flex-col items-center gap-y-2 xl:mt-6 xl:items-start xl:gap-y-0">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <Link href="/docs/">
                <Button primary icon={<FastForward />}>
                  Get started
                </Button>
              </Link>
              <Link href="/blog/from-vert-x-3-to-vert-x-4/">
                <Button icon={<ArrowCircleUp />}>Migrate from v3</Button>
              </Link>
            </div>
            {/* <div className="mt-1 text-sm text-gray-700">
              <span className="font-normal">Latest release:</span> v
              {latestRelease.version}
            </div> */}
          </div>
        </div>
        {/* right side */}
        <div className="hidden w-[570px] xl:block">
          <MainCodeExamples />
        </div>
      </Container>
    </Provider>
  </section>
)

export default Hero
