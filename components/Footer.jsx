import "./Footer.scss";
import Link from "next/link";

export default () => (
  <footer>
    <div className="container">
      <div className="footer-nav-section">
        <div className="footer-nav-list footer-logo">
          <Link href="/">
            <a><img src={require("../assets/logo.svg")} /></a>
          </Link>
        </div>
        <div className="footer-nav-list">
          <h5>Eclipse Vert.x</h5>
          <ul>
            <li><Link href="/"><a>Ecosystem</a></Link></li>
            <li><Link href="/docs/"><a>Docs</a></Link></li>
            <li><Link href="/"><a>FAQ</a></Link></li>
            <li><Link href="/"><a>Blog</a></Link></li>
            <li><Link href="/"><a>Community</a></Link></li>
          </ul>
        </div>
        <div className="footer-nav-list">
          <h5>Eclipse</h5>
          <ul>
            <li><a href="https://www.eclipse.org/">Eclipse Foundation</a></li>
            <li><a href="https://eclipse.org/legal/privacy.php">Docs</a></li>
            <li><a href="https://www.eclipse.org/legal/termsofuse.php">Terms of Use</a></li>
            <li><a href="https://www.eclipse.org/legal/copyright.php">Copyright Agent</a></li>
            <li><a href="https://www.eclipse.org/legal/">Legal Resources</a></li>
          </ul>
        </div>
      </div>
      <p>
        &copy; {new Date().getFullYear()} TODO Copyright holders<br/>
        Eclipse Vert.x is open source and dual-licensed under
        the <a href="https://creativecommons.org/licenses/by-sa/3.0/">Eclipse Public License 2.0</a> and
        the <a href="https://www.apache.org/licenses/LICENSE-2.0.html">Apache License 2.0</a>.<br/>
        The website is licensed under the TODO license. Website design by <a href="https://michelkraemer.com">Michel Krämer</a>.
      </p>
    </div>
  </footer>
);
