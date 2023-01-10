import styles from "./Logos.scss?type=global"
import Button from "../Button"
import { Mail } from "react-feather"
import shuffle from "lodash/shuffle"
import { useEffect, useRef } from "react"

const LOGOS = [{
  name: "Deutsche Börse Group",
  src: "deutsche-boerse-group.svg",
  url: "https://deutsche-boerse.com/dbg-en/"
}, {
  name: "EF Education First",
  src: "education-first.svg",
  url: "https://www.ef.edu/"
}, {
  name: "Fraunhofer",
  src: "fraunhofer.svg",
  url: "https://www.fraunhofer.de/"
}, {
  name: "Gentics",
  src: "gentics.svg",
  url: "https://www.gentics.com/"
}, {
  name: "Groupon",
  src: "groupon.svg",
  url: "https://www.groupon.com/"
}, {
  name: "Here Technologies",
  src: "here.svg",
  url: "https://www.here.com/"
}, {
  name: "Hose Beijing",
  src: "hose.svg",
  url: "https://www.ekuaibao.com/"
}, {
  name: "Hulu",
  src: "hulu.svg",
  url: "https://www.hulu.com/"
}, {
  name: "Instana",
  src: "instana.svg",
  url: "https://www.instana.com/"
}, {
  name: "ING",
  src: "ing.svg",
  url: "https://ing.com"
}, {
  name: "Michelin",
  src: "michelin.png",
  url: "https://blogit.michelin.io/connected-tires-lessons-learned-in-moving-to-reactive-systems/"
}, {
  name: "Mobitech",
  src: "mobitech.svg",
  url: "https://mobitech.io/"
}, {
  name: "RBS",
  src: "rbs.svg",
  url: "https://www.rbs.com/"
}, {
  name: "Red Hat",
  src: "redhat.svg",
  url: "https://www.redhat.com/"
}, {
  name: "SAP",
  src: "sap.svg",
  url: "https://www.sap.com/"
}, {
  name: "Swiss Post",
  src: "swiss-post.svg",
  url: "https://www.post.ch/"
}, {
  name: "Taringa!",
  src: "taringa.svg",
  url: "https://www.taringa.net/"
}, {
  name: "Tesco",
  src: "tesco.svg",
  url: "http://www.tesco.com/"
}, {
  name: "Ticketmaster",
  src: "ticketmaster.svg",
  url: "https://www.ticketmaster.com/"
}, {
  name: "Drovio",
  src: "drovio.svg",
  url: "https://www.drovio.com/"
}, {
  name: "Zalando Tech",
  src: "zalando.svg",
  url: "https://tech.zalando.com/"
}, {
  name: "ForgeRock",
  src: "forgerock.svg",
  url: "https://www.forgerock.com/"
}].map(logo => Object.assign({ logo: require(`../../assets/logos/${logo.src}`) }, logo))

// Each logo should have a dummy height so the browser correctly calculates
// the size of the surrounding div. Note that the width will be overriden
// with the max-width attribute in the logo's CSS.
const DUMMY_IMAGE_HEIGHT = "300"

const LOGO_ELEMENTS = LOGOS.map(logo => (
  <a key={logo.src} href={logo.url} target="_blank" rel="noopener noreferrer">
    <img height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo.logo} alt={logo.name} />
  </a>
))
const LOGO_ELEMENTS1 = LOGO_ELEMENTS.slice(0, LOGO_ELEMENTS.length / 2)
const LOGO_ELEMENTS2 = LOGO_ELEMENTS.slice(LOGO_ELEMENTS.length / 2)

const DURATION1 = 450 / LOGO_ELEMENTS1.length
const DURATION2 = 800 / LOGO_ELEMENTS2.length

function shuffleChildren(node) {
  let result = []
  for (let c of node.children) {
    result.push(c)
  }
  return shuffle(result)
}

const Logos = () => {
  const refRow1a = useRef()
  const refRow1b = useRef()
  const refRow2a = useRef()
  const refRow2b = useRef()

  useEffect(() => {
    let newChildren1 = shuffleChildren(refRow1a.current)
    refRow1a.current.innerHTML = ""
    refRow1b.current.innerHTML = ""
    for (let c of newChildren1) {
      refRow1a.current.appendChild(c)
      refRow1b.current.appendChild(c.cloneNode(true))
    }

    let newChildren2 = shuffleChildren(refRow2a.current)
    refRow2a.current.innerHTML = ""
    refRow2b.current.innerHTML = ""
    for (let c of newChildren2) {
      refRow2a.current.appendChild(c)
      refRow2b.current.appendChild(c.cloneNode(true))
    }
  }, [])

  return (
    <div className="logos">
      <hr/>
      <h3>Who&rsquo;s using Eclipse Vert.x?</h3>
      <div className="logos-row" style={{ animationDuration: `${DURATION1}s` }}>
        <div className="logos-row-half" ref={refRow1a}>{LOGO_ELEMENTS1}</div>
        <div className="logos-row-half" ref={refRow1b}>{LOGO_ELEMENTS1}</div>
      </div>
      <div className="logos-row-divider"></div>
      <div className="logos-row" style={{ animationDuration: `${DURATION2}s` }}>
        <div className="logos-row-half" ref={refRow2a}>{LOGO_ELEMENTS2}</div>
        <div className="logos-row-half" ref={refRow2b}>{LOGO_ELEMENTS2}</div>
      </div>
      <div className="logos-contact-us">
        <span className="logos-contact-us-question">Want to be listed here?</span>
        <a href="mailto:vertx-enquiries@googlegroups.com"><Button primary icon={<Mail />}>
          Contact us!
        </Button></a>
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Logos
