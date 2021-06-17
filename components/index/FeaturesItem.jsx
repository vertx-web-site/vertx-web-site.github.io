import { cloneElement } from "react"
import styles from "./FeaturesItem.scss?type=global"

const FeaturesItem = ({ icon, title, children }) => {
  let newIcon = cloneElement(icon, {
    size: 46
  })

  return (
    <div className="features-item">
      <span className="features-item-icon">{newIcon}</span>
      <h5>{title}</h5>
      {children}
      <style jsx>{styles}</style>
    </div>
  )
}

export default FeaturesItem
