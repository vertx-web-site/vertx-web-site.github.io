import "./Cards.scss"

const Cards = ({ columns = 1, children }) => {
  return <div className="cards" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>{children}</div>
}

export default Cards
