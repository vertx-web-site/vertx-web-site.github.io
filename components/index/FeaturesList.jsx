import styles from "./FeaturesList.scss?type=global"

const FeaturesList = ({ children }) => (
  <div className="features">
    {children}
    <style jsx>{styles}</style>
  </div>
)

export default FeaturesList
