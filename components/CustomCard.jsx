import Link from "next/link"
import styles from "./Card.scss"
import { useState } from "react"

const CustomCard = ({ href, title, icon, img, children }) => {
  const [showQRCode, setShowQRCode] = useState(false)
  function onMouseOver() {
    if (!img)return
    setShowQRCode(true)
  }
  function onMouseLeave() {
    if (!img)return
    setShowQRCode(false)
  }

  let result = <div className="card-content" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
    <h4>
      {icon && <span className="card-content-icon">{icon}</span>}
      {title}
    </h4>
    {children}
    {
      showQRCode? <img src={img} className="custom-card-img" alt="图片"/> : null
    }
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

export default CustomCard
