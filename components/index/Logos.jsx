import "./Logos.scss";
import Button from "../Button";
import { Mail } from "react-feather";
import shuffle from "lodash.shuffle";
import { useEffect, useRef } from "react";

const LOGOS = [{
  src: "deutsche-boerse-group.svg",
  url: "https://deutsche-boerse.com/dbg-en/"
}, {
  src: "education-first.svg",
  url: "https://www.ef.edu/"
}, {
  src: "fraunhofer.svg",
  url: "https://www.fraunhofer.de/"
}, {
  src: "groupon.svg",
  url: "https://www.groupon.com/"
}, {
  src: "hulu.svg",
  url: "https://www.hulu.com/"
}, {
  src: "instana.svg",
  url: "https://www.instana.com/"
}, {
  src: "rbs.svg",
  url: "https://www.rbs.com/"
}, {
  src: "redhat.svg",
  url: "https://www.redhat.com/"
}, {
  src: "swiss-post.svg",
  url: "https://www.post.ch/"
}, {
  src: "taringa.svg",
  url: "https://www.taringa.net/"
}, {
  src: "tesco.svg",
  url: "http://www.tesco.com/"
}, {
  src: "ticketmaster.svg",
  url: "https://www.ticketmaster.com/"
}, {
  src: "zalando.svg",
  url: "https://tech.zalando.com/"
}].map(logo => Object.assign({ logo: require(`../../assets/logos/${logo.src}`) }, logo));

// Each logo should have a dummy height so the browser correctly calculates
// the size of the surrounding div. Note that the width will be overriden
// with the max-width attribute in the logo's CSS.
const DUMMY_IMAGE_HEIGHT = "300";

const LOGO_ELEMENTS = LOGOS.map(logo => (
  <a key={logo.src} href={logo.url} target="_blank">
    <img height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo.logo} />
  </a>
));

function shuffleChildren(node) {
  let result = [];
  for (let c of node.children) {
    result.push(c);
  }
  return shuffle(result);
}

export default () => {
  const refRow1a = useRef();
  const refRow1b = useRef();
  const refRow2a = useRef();
  const refRow2b = useRef();

  useEffect(() => {
    let newChildren1 = shuffleChildren(refRow1a.current);
    refRow1a.current.innerHTML = "";
    refRow1b.current.innerHTML = "";
    for (let c of newChildren1) {
      refRow1a.current.appendChild(c);
      refRow1b.current.appendChild(c.cloneNode(true));
    }

    let newChildren2 = shuffleChildren(refRow2a.current);
    refRow2a.current.innerHTML = "";
    refRow2b.current.innerHTML = "";
    for (let c of newChildren2) {
      refRow2a.current.appendChild(c);
      refRow2b.current.appendChild(c.cloneNode(true));
    }
  }, []);

  return (
    <div className="logos">
      <hr/>
      <h3>Who's using Eclipse Vert.x?</h3>
      <div className="logos-row">
        <div className="logos-row-half" ref={refRow1a}>{LOGO_ELEMENTS}</div>
        <div className="logos-row-half" ref={refRow1b}>{LOGO_ELEMENTS}</div>
      </div>
      <div className="logos-row-divider"></div>
      <div className="logos-row">
        <div className="logos-row-half" ref={refRow2a}>{LOGO_ELEMENTS}</div>
        <div className="logos-row-half" ref={refRow2b}>{LOGO_ELEMENTS}</div>
      </div>
      <div className="logos-contact-us">
        <span className="logos-contact-us-question">Want to be listed here?</span>
        <a href="mailto:vertx-enquiries@googlegroups.com"><Button primary>
          <Mail className="feather" /> Contact us!
        </Button></a>
      </div>
    </div>
  );
};
