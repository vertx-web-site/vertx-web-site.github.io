import Layout from "../components/layouts/Community"
import CommunityProfile from "../components/community/CommunityProfile"
import CommunitySection from "../components/community/CommunitySection"

export async function getStaticProps() {
  const CACHE_TIMEOUT_SECONDS = 60 * 60 // one hour
  const CACHE_PATH = "./.cache/community"

  const { Octokit } = require("@octokit/rest")
  const { CachedFetch } = require("../components/community/cached-fetch")

  const fetch = CachedFetch({
    cacheTimeoutSeconds: CACHE_TIMEOUT_SECONDS,
    cachePath: CACHE_PATH
  })

  const octokit = new Octokit({
    auth: "38d84baff03b7c2365180c7d2ee38866295f429f", // TODO!!!!
    request: {
      fetch
    }
  })

  console.log("Updating list of contributors ...")

  let repos = [{
    name: "vert.x",
    full_name: "eclipse-vertx/vert.x",
    owner: {
      login: "eclipse-vertx"
    }
  }]

  console.log("Fetching repositories ...")
  repos = repos.concat(await octokit.paginate(octokit.repos.listForOrg, { org: "vert-x" }))
  repos = repos.concat(await octokit.paginate(octokit.repos.listForOrg, { org: "vert-x3" }))
  repos = repos.concat(await octokit.paginate(octokit.repos.listForOrg, { org: "vertx-web-site" }))

  let contributors = []
  for (let repo of repos) {
    console.log(`Fetching contributors of ${repo.full_name} ...`)
    let repoContributors = await octokit.paginate(octokit.repos.listContributors, {
      owner: repo.owner.login,
      repo: repo.name
    })

    // merge found contributors into list of all contributors
    for (let repoContributor of repoContributors) {
      let contributor = contributors.find(c => c.login === repoContributor.login)
      if (contributor === undefined) {
        contributor = {
          login: repoContributor.login,
          avatar_url: repoContributor.avatar_url,
          contributions: 0
        }
        contributors.push(contributor)
      }
      contributor.contributions += repoContributor.contributions
    }
  }

  console.log("Done.")

  // sort contributors by their number of contributions
  contributors.sort((a, b) => b.contributions - a.contributions)

  return {
    props: {
      contributors
    }
  }
}

const Community = ({ contributors }) => {
  return (
    <Layout>
      <CommunitySection title="Contributors">
        {contributors.map(c => <CommunityProfile key={c.login} githubId={c.login} avatarUrl={c.avatar_url} />)}
      </CommunitySection>
    </Layout>
  )
}

export default Community
