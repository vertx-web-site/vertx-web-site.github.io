import classNames from "classnames"
import "./CommunityProfile.scss"

const CommunityProfile = ({ githubId, avatarUrl, size = "small" }) => {
  let cx = 300
  if (size === "medium") {
    cx = 200
  } else if (size === "small") {
    cx = 100
  }

  return (
    <div className="community-profile">
      <a href={`https://github.com/${githubId}`} target="_blank" rel="noopener noreferrer">
        <img src={`${avatarUrl}&s=${cx}` || `https://github.com/${githubId}.png?size=${cx}`}
          className={classNames("bordered", size)} />
      </a>
    </div>
  )
}

export default CommunityProfile
