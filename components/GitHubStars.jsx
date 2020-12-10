import Button from "./Button"
import Head from "next/head"
import { useEffect, useState } from "react"
import { GitHub } from "react-feather"
import "./GitHubStars.scss"

const GitHubStars = ({ org, repo, fallbackValue, button }) => {
  const url = `https://api.github.com/repos/${org}/${repo}`
  const [stars, setStars] = useState(fallbackValue)

  useEffect(() => {
    async function fetchStars() {
      let response = await fetch(url)
      let json = await response.json()
      setStars(json.stargazers_count)
    }
    fetchStars()
  }, [url])

  let label
  if (stars !== undefined) {
    if (stars >= 1000) {
      label = Math.floor(stars / 1000) + "K+ stars"
    } else {
      label = stars + " stars"
    }
  }

  let content = <><GitHub className="feather" />{label}</>

  return (
    <>
      <Head>
        <link rel="preload" href={url} as="fetch" crossOrigin="anonymous" />
      </Head>
      <div className="github-stars">
        <a href={`https://github.com/${org}/${repo}`}>
          {button ? <Button>{content}</Button> : content}
        </a>
      </div>
    </>
  )
}

export default GitHubStars
