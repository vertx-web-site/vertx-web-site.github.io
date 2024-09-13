import Button from "../Button"
import Container from "../Container"
import { motion } from "framer-motion"
import { shuffle } from "lodash"
import { useEffect, useRef, useState } from "react"
import { Mail } from "react-feather"

const LOGOS = [
  {
    name: "Deutsche Börse Group",
    src: "deutsche-boerse-group.svg",
    url: "https://deutsche-boerse.com/dbg-en/",
  },
  {
    name: "EF Education First",
    src: "education-first.svg",
    url: "https://www.ef.edu/",
  },
  {
    name: "Fraunhofer",
    src: "fraunhofer.svg",
    url: "https://www.fraunhofer.de/",
  },
  {
    name: "Gentics",
    src: "gentics.svg",
    url: "https://www.gentics.com/",
  },
  {
    name: "Groupon",
    src: "groupon.svg",
    url: "https://www.groupon.com/",
  },
  {
    name: "Here Technologies",
    src: "here.svg",
    url: "https://www.here.com/",
  },
  {
    name: "Hose Beijing",
    src: "hose.svg",
    url: "https://www.ekuaibao.com/",
  },
  {
    name: "Hulu",
    src: "hulu.svg",
    url: "https://www.hulu.com/",
  },
  {
    name: "Instana",
    src: "instana.svg",
    url: "https://www.instana.com/",
  },
  {
    name: "ING",
    src: "ing.svg",
    url: "https://ing.com",
  },
  {
    name: "Michelin",
    src: "michelin.png",
    url: "https://blogit.michelin.io/connected-tires-lessons-learned-in-moving-to-reactive-systems/",
  },
  {
    name: "Mobitech",
    src: "mobitech.svg",
    url: "https://mobitech.io/",
  },
  {
    name: "RBS",
    src: "rbs.svg",
    url: "https://www.rbs.com/",
  },
  {
    name: "Red Hat",
    src: "redhat.svg",
    url: "https://www.redhat.com/",
  },
  {
    name: "Restate",
    src: "restate.svg",
    url: "https://restate.dev/",
  },
  {
    name: "SAP",
    src: "sap.svg",
    url: "https://www.sap.com/",
  },
  {
    name: "Swiss Post",
    src: "swiss-post.svg",
    url: "https://www.post.ch/",
  },
  {
    name: "Taringa!",
    src: "taringa.svg",
    url: "https://www.taringa.net/",
  },
  {
    name: "Tesco",
    src: "tesco.svg",
    url: "http://www.tesco.com/",
  },
  {
    name: "Ticketmaster",
    src: "ticketmaster.svg",
    url: "https://www.ticketmaster.com/",
  },
  {
    name: "Drovio",
    src: "drovio.svg",
    url: "https://www.drovio.com/",
  },
  {
    name: "Zalando Tech",
    src: "zalando.svg",
    url: "https://tech.zalando.com/",
  },
  {
    name: "ForgeRock",
    src: "forgerock.svg",
    url: "https://www.forgerock.com/",
  },
].map(logo =>
  Object.assign({ logo: require(`../../assets/logos/${logo.src}`) }, logo),
)

const LOGO_ELEMENTS = LOGOS.map(logo => (
  <a
    key={logo.src}
    href={logo.url}
    target="_blank"
    rel="noopener noreferrer"
    className="h-full w-auto opacity-75 saturate-0 transition-all hover:opacity-100 hover:saturate-100 dark:invert dark:hover:saturate-0"
  >
    <img className="h-full w-auto max-w-max" src={logo.logo} alt={logo.name} />
  </a>
))

const Logos = () => {
  const refRow1a = useRef<HTMLDivElement>(null)
  const refRow1b = useRef<HTMLDivElement>(null)
  const refRow2a = useRef<HTMLDivElement>(null)
  const refRow2b = useRef<HTMLDivElement>(null)

  const [logoElements1, setLogoElements1] = useState<JSX.Element[]>()
  const [logoElements2, setLogoElements2] = useState<JSX.Element[]>()

  useEffect(() => {
    let shuffled = shuffle(LOGO_ELEMENTS)
    setLogoElements1(shuffled.slice(0, shuffled.length / 2))
    setLogoElements2(shuffled.slice(shuffled.length / 2))
  }, [])

  return (
    <section>
      <Container className="prose">
        <h3 className="text-center text-3xl">
          Who&rsquo;s using Eclipse Vert.x?
        </h3>
      </Container>
      <div className="my-16 flex max-w-full flex-col items-start gap-14 overflow-x-hidden">
        <motion.div
          className="inline-flex flex-row"
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 900 / LOGO_ELEMENTS.length,
            repeat: Infinity,
          }}
        >
          <div
            ref={refRow1a}
            className="mr-24 flex h-8 flex-row gap-12 md:gap-24"
          >
            {logoElements1}
          </div>
          <div
            ref={refRow1b}
            className="mr-24 flex h-8 flex-row gap-12 md:gap-24"
          >
            {logoElements1}
          </div>
        </motion.div>
        <motion.div
          className="inline-flex flex-row"
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 1600 / LOGO_ELEMENTS.length,
            repeat: Infinity,
          }}
        >
          <div
            ref={refRow2a}
            className="mr-24 flex h-8 flex-row gap-12 md:gap-24"
          >
            {logoElements2}
          </div>
          <div
            ref={refRow2b}
            className="mr-24 flex h-8 flex-row gap-12 md:gap-24"
          >
            {logoElements2}
          </div>
        </motion.div>
      </div>

      <Container className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div>Want to be listed here?</div>
        <a href="mailto:vertx-enquiries@googlegroups.com">
          <Button primary icon={<Mail />}>
            Contact us!
          </Button>
        </a>
      </Container>
    </section>
  )
}

export default Logos
