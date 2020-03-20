import classNames from "classnames";
import "./Button.scss";

export default ({ children, primary }) => (
  <div className={classNames("button", { primary })}>{children}</div>
);
