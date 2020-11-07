import { cloneElement } from "react"
import "./FeaturesItem.scss"

const FeaturesItem = ({ icon, title, children }) => {
  let newIcon = cloneElement(icon, {
    size: 46
  })

  return (
    <div className="features-item">
      <span className="features-item-icon">{newIcon}</span>
      <h5>{title}</h5>
      {children}
    </div>
  )
}

export default FeaturesItem
