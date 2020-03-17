import classNames from "classnames";
import "./Button.scss";

export default ({ children, href, primary }) => (
  <a className={classNames("button", { primary })} href={href}>{children}</a>
);
