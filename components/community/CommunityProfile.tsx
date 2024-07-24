import SimpleIcon from "../SimpleIcon"
import { Contributor, FetchedUser } from "./types"
import { House, MapPin } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { siGithub, siX } from "simple-icons/icons"

export interface CommunityProfileProps {
  profile: FetchedUser | Contributor
  size?: "small" | "medium" | "large"
}

const CommunityProfile = ({
  profile,
  size = "small",
}: CommunityProfileProps) => {
  let cx = 300
  if (size === "medium") {
    cx = 220
  } else if (size === "small") {
    cx = 150
  }

  const name =
    "name" in profile && profile.name !== undefined
      ? profile.name
      : profile.githubId

  return (
    <div
      className={clsx("flex flex-1 flex-col items-center", {
        "min-w-48": size === "large",
        "min-w-44": size === "medium",
        "min-w-16": size === "small",
      })}
      data-contributions={profile.contributions}
    >
      <a
        href={`https://github.com/${profile.githubId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          srcSet={
            (`${profile.avatar_url}&s=${cx} 2x,` ||
              `https://github.com/${profile.githubId}.png?size=${cx} 2x,`) +
            (`${profile.avatar_url}&s=${cx / 2}` ||
              `https://github.com/${profile.githubId}.png?size=${cx / 2}`)
          }
          alt={name}
          title={size === "small" ? name : undefined}
          loading={size === "small" ? "lazy" : "eager"}
          className={clsx("rounded-full border border-gray-200", {
            "mb-4 w-32": size === "large",
            "mb-3 w-24": size === "medium",
            "w-16": size === "small",
          })}
          width={cx}
          height={cx}
        />
      </a>
      {"name" in profile && profile.name !== undefined && (
        <div
          className={clsx("text-center font-normal", {
            "text-lg": size === "large",
            "text-base": size === "medium",
          })}
        >
          {profile.name}
        </div>
      )}
      {"role" in profile && profile.role !== undefined && (
        <div className="mb-4 mt-1 text-center uppercase leading-tight">
          {profile.role}
        </div>
      )}
      {"location" in profile && profile.location !== undefined && (
        <div className="mb-4 text-center leading-tight text-gray-600">
          <MapPin className="mb-[2px] mr-1 inline" size="1.2em" />
          {profile.location}
        </div>
      )}
      {size !== "small" && (
        <div className="flex gap-2">
          <a
            href={`https://github.com/${profile.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SimpleIcon icon={siGithub} size="1.4em" />
          </a>
          {"blog" in profile && profile.blog !== undefined && (
            <a href={profile.blog} target="_blank" rel="noopener noreferrer">
              <House size="1.5em" alt="Website" />
            </a>
          )}
          {"x" in profile && profile.x !== undefined && (
            <a
              href={`https://x.com/${profile.x}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SimpleIcon icon={siX} size="1.4em" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default CommunityProfile
