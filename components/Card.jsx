import Link from "next/link"
import "./Card.scss"

const Card = ({ href, title, children }) => {
  let result = <div className="card-content"><h4>{title}</h4>{children}</div>

  if (href !== undefined) {
    if (href.match(/^https?:\/\//)) {
      result = <a href={href} target="_blank" rel="noreferrer" className="card-link">{result}</a>
    } else {
      result = <Link href={href}><a className="card-link">{result}</a></Link>
    }
  }

  return result
}

export default Card
