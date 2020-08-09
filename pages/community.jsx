import Layout from "../components/layouts/Community"
import CommunityProfile from "../components/community/CommunityProfile"
import CommunitySection from "../components/community/CommunitySection"

const FULL_TIME_DEVELOPERS = [{
  githubId: "vietj",
  role: "Project lead",
  twitter: "julienviet"
}, {
  githubId: "pmlopes",
  role: "Core developer",
  twitter: "pml0pes"
}, {
  githubId: "cescoffier",
  role: "Core developer",
  twitter: "clementplop"
}, {
  githubId: "tsegismont",
  role: "Core developer",
  twitter: "tsegismont"
}, {
  githubId: "jponge",
  role: "Core developer",
  twitter: "jponge"
}]

const MAINTAINERS = [{
  githubId: "michel-kraemer",
  role: "Web site"
}, {
  githubId: "alexlehm",
  role: "SMTP client",
  twitter: "alexlehm"
}, {
  githubId: "Narigo",
  role: "MySQL/PostgreSQL"
}, {
  githubId: "johnoliver",
  role: "MongoDB client"
}, {
  githubId: "kuujo",
  role: "Python"
}, {
  githubId: "codepitbull",
  role: "Scala"
}, {
  githubId: "karianna",
  role: "MongoDB client"
}, {
  githubId: "gemmellr",
  role: "AMQP bridge, Proton"
}, {
  githubId: "ppatierno",
  role: "MQTT server & client, Kafka client",
  twitter: "ppatierno"
}, {
  githubId: "maeste",
  role: "JCA Adapter"
}, {
  githubId: "davsclaus",
  role: "Camel bridge"
}, {
  githubId: "agura",
  role: "Apache Ignite Cluster Manager"
}, {
  githubId: "poiuytrez",
  role: "RabbitMQ client"
}, {
  githubId: "stream-iori",
  role: "Zookeeper Cluster Manager"
}, {
  githubId: "ruslansennov",
  role: "Consul Client"
}, {
  githubId: "fromage",
  role: "Ceylon language"
}, {
  githubId: "danielpetisme",
  role: "Vert.x Starter",
  twitter: "danielpetisme"
}, {
  githubId: "slinkydeveloper",
  role: "Vert.x Web API Contract",
  twitter: "SlinkyGuardiani"
}, {
  githubId: "Sammers21",
  role: "Cassandra and RabbitMQ client"
}, {
  githubId: "gaol",
  role: "Vertx Mail Client"
}, {
  githubId: "BillyYccc",
  role: "SQL Client"
}]

async function fetchUsers(users, contributors, octokit) {
  let result = []

  for (let user of users) {
    console.log(`Fetching information about user ${user.githubId} ...`)

    let info = await octokit.users.getByUsername({ username: user.githubId })
    info = info.data

    let contributor = {}
    let i = contributors.findIndex(c => c.githubId === user.githubId)
    if (i >= 0) {
      contributor = contributors[i]
      contributors.splice(i, 1)
    }

    let blog = info.blog
    if (blog && !/^[a-z]+:\/\//.test(blog)) {
      blog = "http://" + blog
    }

    let newUser = {
      ...user,
      avatar_url: info.avatar_url,
      name: info.name,
      blog,
      location: info.location,
      twitter: info.twitter_username || user.twitter || null,
      contributions: contributor.contributions || 0
    }

    result.push(newUser)
  }

  return result
}

async function fetchContributors(octokit) {
  let contributors = []

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

  for (let repo of repos) {
    console.log(`Fetching contributors of ${repo.full_name} ...`)
    let repoContributors = await octokit.paginate(octokit.repos.listContributors, {
      owner: repo.owner.login,
      repo: repo.name
    })

    // merge found contributors into list of all contributors
    for (let repoContributor of repoContributors) {
      let contributor = contributors.find(c => c.githubId === repoContributor.login)
      if (contributor === undefined) {
        contributor = {
          githubId: repoContributor.login,
          avatar_url: repoContributor.avatar_url,
          contributions: 0
        }
        contributors.push(contributor)
      }
      contributor.contributions += repoContributor.contributions
    }
  }

  console.log("Done.")

  return contributors
}

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
    auth: process.env.GITHUB_ACCESS_TOKEN,
    request: {
      fetch
    }
  })

  let fullTimeDevelopers = null
  let maintainers = null
  let contributors = null
  if (process.env.GITHUB_ACCESS_TOKEN === undefined) {
    console.log("No GitHub access token found. Generating list of contributors " +
      "will be skipped. To fix this, provide an environment variable " +
      "`GITHUB_ACCESS_TOKEN` with your personal access token. For example: " +
      "`GITHUB_ACCESS_TOKEN=abcdefghijklmnopqrs0123456789 npm run build`")
  } else {
    // fetch contributors
    contributors = await fetchContributors(octokit)

    // fetch information about full-time developers and maintainers
    fullTimeDevelopers = await fetchUsers(FULL_TIME_DEVELOPERS, contributors, octokit)
    maintainers = await fetchUsers(MAINTAINERS, contributors, octokit)

    // sort users by their number of contributions
    fullTimeDevelopers.sort((a, b) => b.contributions - a.contributions)
    maintainers.sort((a, b) => b.contributions - a.contributions)
    contributors.sort((a, b) => b.contributions - a.contributions)
  }

  return {
    props: {
      fullTimeDevelopers,
      maintainers,
      contributors
    }
  }
}

const Community = ({ fullTimeDevelopers, maintainers, contributors }) => {
  return (
    <Layout>
      {fullTimeDevelopers !== null && (
        <CommunitySection title="Full-time developers">
          {fullTimeDevelopers.map(c => <CommunityProfile key={c.githubId} profile={c} size="large" />)}
        </CommunitySection>
      )}
      {maintainers !== null && (
        <CommunitySection title="Component maintainers">
          {maintainers.map(c => <CommunityProfile key={c.githubId} profile={c} size="medium" />)}
        </CommunitySection>
      )}
      {contributors !== null && (
        <CommunitySection title="Contributors">
          {contributors.map(c => <CommunityProfile key={c.githubId} profile={c} />)}
        </CommunitySection>
      )}
    </Layout>
  )
}

export default Community
