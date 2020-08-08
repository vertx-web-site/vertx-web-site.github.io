import "./CommunitySection.scss"

const CommunitySection = ({ title, children }) => {
  return (
    <section className="community-section">
      <h2>{title}</h2>
      <div className="community-section-main">
        {children}
      </div>
    </section>
  )
}

export default CommunitySection
