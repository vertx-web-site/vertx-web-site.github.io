import Layout from "../components/layouts/Community"
import CommunityProfile from "../components/community/CommunityProfile"
import CommunitySection from "../components/community/CommunitySection"
import pMap from "p-map"
import pRetry from "p-retry"

const FULL_TIME_DEVELOPERS = [{
  githubId: "vietj",
  role: "Project lead",
  twitter: "julienviet"
}, {
  githubId: "pmlopes",
  role: "Core developer",
  twitter: "pml0pes"
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
  githubId: "cescoffier",
  role: "Core developer",
  twitter: "clementplop"
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
  githubId: "zyclonite",
  role: "Apache Ignite Cluster Manager",
  twitter: "zyclonite"
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
  role: "Vert.x Web OpenAPI",
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
}, {
  githubId: "jellenelis",
  role: "OSGi"
}, {
  githubId: "Yaytay",
  role: "RabbitMQ client"
}, {
  githubId: "smagellan",
  role: "ClickHouse client"
}, {
  githubId: "pk-work",
  role: "Vert.x OpenAPI"
}]

// maximum number of parallel requests against the GitHub API
const MAX_CONCURRENCY = 2

async function fetchUsers(users, contributors, octokit) {
  let result = []

  let fetchResults = await pMap(users, user => {
    console.log(`Fetching information about user ${user.githubId} ...`)
    return octokit.users.getByUsername({ username: user.githubId })
      .then(info => [info.data, user])
  }, { concurrency: MAX_CONCURRENCY })

  for (let fetchResult of fetchResults) {
    let [info, user] = fetchResult

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
  let fetchedRepos = await pMap(["vert-x", "vert-x3", "vertx-web-site"], org =>
    octokit.paginate(octokit.repos.listForOrg, { org }), { concurrency: MAX_CONCURRENCY })
  for (let fetchedRepo of fetchedRepos) {
    repos = repos.concat(fetchedRepo)
  }

  let fetchedRepoContributors = await pMap(repos, repo => {
    console.log(`Fetching contributors of ${repo.full_name} ...`)
    return octokit.paginate(octokit.repos.listContributors, {
      owner: repo.owner.login,
      repo: repo.name
    })
  }, { concurrency: MAX_CONCURRENCY })

  for (let repoContributors of fetchedRepoContributors) {
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
  const { Octokit } = require("@octokit/rest")
  const fetch = require("make-fetch-happen").defaults({
    cachePath: "./.cache/community2"
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
    let retryOptions = {
      onFailedAttempt: async error => {
        console.error(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`)
        console.error(`Error message: ${error.message}`)
      },
      retries: 5
    }

    // fetch contributors
    contributors = await pRetry(() => fetchContributors(octokit), retryOptions)

    // fetch information about full-time developers and maintainers
    fullTimeDevelopers = await pRetry(() => fetchUsers(FULL_TIME_DEVELOPERS, contributors, octokit), retryOptions)
    maintainers = await pRetry(() => fetchUsers(MAINTAINERS, contributors, octokit), retryOptions)

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
