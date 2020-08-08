import "./CommunityProfile.scss"

const CommunityProfile = ({ githubId }) => {
  return (
    <div className="community-profile">
      <a href={`https://github.com/${githubId}`} target="_blank" rel="noopener noreferrer">
        <img src={`https://github.com/${githubId}.png?size=300`} className="bordered" />
      </a>
    </div>
  )
}

export default CommunityProfile
