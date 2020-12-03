import "./Cards.scss"
import classNames from "classnames"

const Cards = ({ columns = 1, children }) => {
  return <div className={classNames("cards", `cards-cols-${columns}`)}>{children}</div>
}

export default Cards
