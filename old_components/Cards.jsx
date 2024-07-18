import styles from "./Cards.scss"
import classNames from "classnames"

const Cards = ({ columns = 1, children }) => {
  return <div className={classNames("cards", `cards-cols-${columns}`)}>
    {children}
    <style jsx>{styles}</style>
  </div>
}

export default Cards
