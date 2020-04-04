import "./Logos.scss";
import Button from "../Button";
import { Mail } from "react-feather";

const LOGOS = [{
  src: "deutsche-boerse-group.svg",
  url: "https://deutsche-boerse.com/dbg-en/"
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
  src: "rbs.svg",
  url: "https://www.rbs.com/"
}, {
  src: "redhat.svg",
  url: "https://www.redhat.com/"
}, {
  src: "swiss-post.svg",
  url: "https://www.post.ch/"
}, {
  src: "ticketmaster.svg",
  url: "https://www.ticketmaster.com/"
}, {
  src: "zalando.svg",
  url: "https://tech.zalando.com/"
}, {
  src: "tesco.svg",
  url: "http://www.tesco.com/"
}].map(logo => Object.assign({ logo: require(`../../assets/logos/${logo.src}`) }, logo));

// Each logo should have a dummy height so the browser correctly calculates
// the size of the surrounding div. Note that the width will be overriden
// with the max-width attribute in the logo's CSS.
const DUMMY_IMAGE_HEIGHT = "300";

const LOGO_ELEMENTS = LOGOS.map(logo => (
  <a href={logo.url} target="_blank">
    <img key={logo.src} height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo.logo} />
  </a>
));

export default () => (
  <div className="logos">
    <hr/>
    <h3>Who's using Eclipse Vert.x?</h3>
    <div className="logos-row">
      <div className="logos-row-half">{LOGO_ELEMENTS}</div>
      <div className="logos-row-half">{LOGO_ELEMENTS}</div>
    </div>
    <div className="logos-row-divider"></div>
    <div className="logos-row">
      <div className="logos-row-half">{LOGO_ELEMENTS}</div>
      <div className="logos-row-half">{LOGO_ELEMENTS}</div>
    </div>
    <div className="logos-contact-us">
      Want to be listed here?
      <a href="mailto:vertx-enquiries@googlegroups.com"><Button primary>
        <Mail className="feather" /> Contact us!
      </Button></a>
    </div>
    <hr />
  </div>
);
