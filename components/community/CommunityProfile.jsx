import classNames from "classnames"
import "./CommunityProfile.scss"
import { Home, MapPin } from "react-feather"
import { Github, Twitter } from "@icons-pack/react-simple-icons"

const CommunityProfile = ({ profile, size = "small" }) => {
  let cx = 300
  if (size === "medium") {
    cx = 220
  } else if (size === "small") {
    cx = 150
  }

  return (
    <div className={classNames("community-profile", size)}>
      <a href={`https://github.com/${profile.githubId}`} target="_blank" rel="noopener noreferrer">
        <img data-srcset={
          (`${profile.avatar_url}&s=${cx} 2x,` || `https://github.com/${profile.githubId}.png?size=${cx} 2x,`) +
          (`${profile.avatar_url}&s=${cx / 2}` || `https://github.com/${profile.githubId}.png?size=${cx / 2}`)
        } alt={profile.name || profile.githubId} title={size === "small" ? (profile.name || profile.githubId) : undefined}
        className="lazyload" />
      </a>
      {profile.name && <div className="community-profile-name">{profile.name}</div>}
      {profile.role && <div className="community-profile-role">{profile.role}</div>}
      {profile.location && <div className="community-profile-location">
        <MapPin className="community-profile-map-pin" /> {profile.location}
      </div>}
      {size !== "small" && (
        <div className="community-profile-social">
          <a href={`https://github.com/${profile.githubId}`} target="_blank" rel="noopener noreferrer"><Github /></a>
          {profile.blog && <a href={profile.blog} target="_blank" rel="noopener noreferrer"><Home /></a>}
          {profile.twitter && <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer"><Twitter /></a>}
        </div>
      )}
    </div>
  )
}

export default CommunityProfile
