import styles from "./CommunitySection.scss?type=global"

const CommunitySection = ({ title, children }) => {
  return (
    <section className="community-section">
      <h2>{title}</h2>
      <div className="community-section-main">
        {children}
      </div>
      <style jsx>{styles}</style>
    </section>
  )
}

export default CommunitySection
