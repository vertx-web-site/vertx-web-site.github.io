import Link from "next/link"
import styles from "./Card.scss"

const Card = ({ href, title, icon, children }) => {
  let result = <div className="card-content">
    <h4>
      {icon && <span className="card-content-icon">{icon}</span>}
      {title}
    </h4>
    {children}
    <style jsx>{styles}</style>
  </div>

  if (href !== undefined) {
    if (href.match(/^https?:\/\//)) {
      result = <a href={href} target="_blank" rel="noreferrer" className="card-link">
        {result}
        <style jsx>{styles}</style>
      </a>
    } else {
      result = <Link href={href}><a className="card-link">
        {result}
        <style jsx>{styles}</style>
      </a></Link>
    }
  }

  return result
}

export default Card
