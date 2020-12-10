import Layout from "../components/layouts/Index"

export async function getStaticProps() {
  const CACHE_TIMEOUT_SECONDS = 60 * 60 // one hour
  const CACHE_PATH = "./.cache/github_stars"

  const { Octokit } = require("@octokit/rest")
  const { CachedFetch } = require("../components/lib/cached-fetch")

  const fetch = CachedFetch({
    cacheTimeoutSeconds: CACHE_TIMEOUT_SECONDS,
    cachePath: CACHE_PATH
  })

  let stars = null

  if (process.env.GITHUB_ACCESS_TOKEN !== undefined) {
    const octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
      request: {
        fetch
      }
    })

    let repoInfo = await octokit.repos.get({ owner: "eclipse-vertx", repo: "vert.x" })
    stars = repoInfo.data.stargazers_count
  }

  return {
    props: {
      gitHubStarsFallbackValue: stars
    }
  }
}

const Index = ({ children, gitHubStarsFallbackValue }) => {
  return <Layout gitHubStarsFallbackValue={gitHubStarsFallbackValue || undefined}>{children}</Layout>
}

export default Index
