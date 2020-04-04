import "./Logos.scss";
import Button from "../Button";
import { Mail } from "react-feather";

const LOGOS = [
  "deutsche-boerse-group.svg",
  "fraunhofer.svg",
  "groupon.svg",
  "hulu.svg",
  "rbs.svg",
  "redhat.svg",
  "swiss-post.svg",
  "ticketmaster.svg",
  "zalando.svg",
  "tesco.svg"
].map(name => require(`../../assets/logos/${name}`));

// Each logo should have a dummy height so the browser correctly calculates
// the size of the surrounding div. Note that the width will be overriden
// with the max-width attribute in the logo's CSS.
const DUMMY_IMAGE_HEIGHT = "300";

export default () => (
  <div className="logos">
    <hr/>
    <h3>Who's using Eclipse Vert.x?</h3>
    <div className="logos-row">
      <div className="logos-row-half">
        {LOGOS.map((logo, i) => <img key={i} height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo} />)}
      </div>
      <div className="logos-row-half">
        {LOGOS.map((logo, i) => <img key={i} height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo} />)}
      </div>
    </div>
    <div className="logos-row-divider"></div>
    <div className="logos-row">
      <div className="logos-row-half">
        {LOGOS.map((logo, i) => <img key={i} height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo} />)}
      </div>
      <div className="logos-row-half">
        {LOGOS.map((logo, i) => <img key={i} height={DUMMY_IMAGE_HEIGHT} className="logos-logo" src={logo} />)}
      </div>
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
