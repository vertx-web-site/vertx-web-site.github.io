import Container from "@/components/Container"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import CommunityHero from "@/components/community/CommunityHero"
import CommunityProfile from "@/components/community/CommunityProfile"
import CommunitySection from "@/components/community/CommunitySection"
import { Contributor, FetchedUser, User } from "@/components/community/types"
import { Octokit } from "@octokit/rest"
import { Metadata } from "next"
import pMap from "p-map"
import pRetry, { FailedAttemptError } from "p-retry"

// export page metadata
export const metadata: Metadata = {
  title: "Community",
}

const FULL_TIME_DEVELOPERS: User[] = [
  {
    githubId: "vietj",
    role: "Project lead",
    x: "julienviet",
  },
  {
    githubId: "pmlopes",
    role: "Core developer",
    x: "pml0pes",
  },
  {
    githubId: "tsegismont",
    role: "Core developer",
    x: "tsegismont",
  },
  {
    githubId: "jponge",
    role: "Core developer",
    x: "jponge",
  },
]

const MAINTAINERS: User[] = [
  {
    githubId: "michel-kraemer",
    role: "Website",
  },
  {
    githubId: "alexlehm",
    role: "SMTP client",
    x: "alexlehm",
  },
  {
    githubId: "cescoffier",
    role: "Core developer",
    x: "clementplop",
  },
  {
    githubId: "Narigo",
    role: "MySQL/PostgreSQL",
  },
  {
    githubId: "johnoliver",
    role: "MongoDB client",
  },
  {
    githubId: "kuujo",
    role: "Python",
  },
  {
    githubId: "codepitbull",
    role: "Scala",
  },
  {
    githubId: "karianna",
    role: "MongoDB client",
  },
  {
    githubId: "gemmellr",
    role: "AMQP bridge, Proton",
  },
  {
    githubId: "ppatierno",
    role: "MQTT server & client, Kafka client",
    x: "ppatierno",
  },
  {
    githubId: "maeste",
    role: "JCA Adapter",
  },
  {
    githubId: "davsclaus",
    role: "Camel bridge",
  },
  {
    githubId: "zyclonite",
    role: "Apache Ignite Cluster Manager",
    x: "zyclonite",
  },
  {
    githubId: "poiuytrez",
    role: "RabbitMQ client",
  },
  {
    githubId: "stream-iori",
    role: "Zookeeper Cluster Manager",
  },
  {
    githubId: "ruslansennov",
    role: "Consul Client",
  },
  {
    githubId: "fromage",
    role: "Ceylon language",
  },
  {
    githubId: "danielpetisme",
    role: "Vert.x Starter",
    x: "danielpetisme",
  },
  {
    githubId: "slinkydeveloper",
    role: "Vert.x Web OpenAPI",
    x: "SlinkyGuardiani",
  },
  {
    githubId: "Sammers21",
    role: "Cassandra and RabbitMQ client",
  },
  {
    githubId: "gaol",
    role: "Vertx Mail Client",
  },
  {
    githubId: "BillyYccc",
    role: "SQL Client",
  },
  {
    githubId: "jellenelis",
    role: "OSGi",
  },
  {
    githubId: "Yaytay",
    role: "RabbitMQ client",
  },
  {
    githubId: "smagellan",
    role: "ClickHouse client",
  },
  {
    githubId: "pk-work",
    role: "Vert.x OpenAPI",
  },
  {
    githubId: "CheesyBoy123",
    role: "Vert.x JSON Schema",
  },
]

// maximum number of parallel requests against the GitHub API
const MAX_CONCURRENCY = 2

// `true` if `fetchAll()` has not been called yet
let FIRST_FETCH_ALL = true

async function fetchUsers(
  users: User[],
  contributors: Contributor[],
  octokit: Octokit,
  log: (message: string) => void,
): Promise<FetchedUser[]> {
  let result: FetchedUser[] = []

  let fetchResults = await pMap(
    users,
    async user => {
      log(`Fetching information about user ${user.githubId} ...`)
      let info = await octokit.users.getByUsername({ username: user.githubId })
      return { info: info.data, user }
    },
    { concurrency: MAX_CONCURRENCY },
  )

  for (let fetchResult of fetchResults) {
    let { info, user } = fetchResult

    let contributor: Contributor | undefined = undefined
    let i = contributors.findIndex(c => c.githubId === user.githubId)
    if (i >= 0) {
      contributor = contributors[i]
      contributors.splice(i, 1)
    }

    let blog = info.blog
    if (blog !== null && !/^[a-z]+:\/\//.test(blog)) {
      blog = "http://" + blog
    }

    let newUser = {
      ...user,
      avatar_url: info.avatar_url,
      name: info.name ?? undefined,
      blog: blog ?? undefined,
      location: info.location ?? undefined,
      x: info.twitter_username ?? user.x ?? undefined,
      contributions: contributor?.contributions ?? 0,
    }

    result.push(newUser)
  }

  return result
}

async function fetchContributors(
  octokit: Octokit,
  log: (message: string) => void,
): Promise<Contributor[]> {
  let contributors: Contributor[] = []

  log("Updating list of contributors ...")

  let repos = [
    {
      name: "vert.x",
      full_name: "eclipse-vertx/vert.x",
      owner: {
        login: "eclipse-vertx",
      },
    },
  ]

  log("Fetching repositories ...")
  let fetchedRepos = await pMap(
    ["vert-x", "vert-x3", "vertx-web-site", "eclipse-vertx"],
    org => octokit.paginate(octokit.repos.listForOrg, { org }),
    { concurrency: MAX_CONCURRENCY },
  )
  for (let fetchedRepo of fetchedRepos) {
    repos = repos.concat(fetchedRepo)
  }

  let fetchedRepoContributors = await pMap(
    repos,
    repo => {
      log(`Fetching contributors of ${repo.full_name} ...`)
      return octokit.paginate(octokit.repos.listContributors, {
        owner: repo.owner.login,
        repo: repo.name,
      })
    },
    { concurrency: MAX_CONCURRENCY },
  )

  for (let repoContributors of fetchedRepoContributors) {
    // merge found contributors into list of all contributors
    for (let repoContributor of repoContributors) {
      let contributor = contributors.find(
        c => c.githubId === repoContributor.login,
      )
      if (contributor === undefined && repoContributor.login !== undefined) {
        contributor = {
          githubId: repoContributor.login,
          avatar_url: repoContributor.avatar_url,
          contributions: 0,
        }
        contributors.push(contributor)
      }
      if (contributor !== undefined) {
        contributor.contributions += repoContributor.contributions
      }
    }
  }

  log("Done.")

  return contributors
}

async function fetchAll(): Promise<{
  fullTimeDevelopers?: FetchedUser[]
  maintainers?: FetchedUser[]
  contributors?: Contributor[]
}> {
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
    request: {
      fetch,
    },
  })

  // The page will be rendered twice during SSR, which is OK because fetches
  // are cached by Next.js. Make sure messages are only logged once.
  let log: (message: string) => void
  if (FIRST_FETCH_ALL) {
    FIRST_FETCH_ALL = false
    log = (message: string) => console.log(message)
  } else {
    log = () => {}
  }

  let fullTimeDevelopers: FetchedUser[] | undefined = undefined
  let maintainers: FetchedUser[] | undefined = undefined
  let contributors: Contributor[] | undefined = undefined
  if (process.env.GITHUB_ACCESS_TOKEN === undefined) {
    log(
      "No GitHub access token found. Generating list of contributors " +
        "will be skipped. To fix this, provide an environment variable " +
        "`GITHUB_ACCESS_TOKEN` with your personal access token. For example: " +
        "`GITHUB_ACCESS_TOKEN=abcdefghijklmnopqrs0123456789 npm run build`",
    )
  } else {
    let retryOptions = {
      onFailedAttempt: async (error: FailedAttemptError) => {
        console.error(
          `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
        )
        console.error(`Error message: ${error.message}`)
      },
      retries: 5,
    }

    // fetch contributors
    contributors = await pRetry(
      () => fetchContributors(octokit, log),
      retryOptions,
    )

    // fetch information about full-time developers and maintainers
    fullTimeDevelopers = await pRetry(
      () => fetchUsers(FULL_TIME_DEVELOPERS, contributors!!, octokit, log),
      retryOptions,
    )
    maintainers = await pRetry(
      () => fetchUsers(MAINTAINERS, contributors!!, octokit, log),
      retryOptions,
    )

    // sort users by their number of contributions
    fullTimeDevelopers.sort((a, b) => b.contributions - a.contributions)
    maintainers.sort((a, b) => b.contributions - a.contributions)
    contributors.sort((a, b) => b.contributions - a.contributions)
  }

  return {
    fullTimeDevelopers,
    maintainers,
    contributors,
  }
}

const Community = async () => {
  const { fullTimeDevelopers, maintainers, contributors } = await fetchAll()
  return (
    <main>
      <NavBar fixed={false} />
      <CommunityHero />
      <Container>
        <div className="text-pretty text-center text-3xl dark:text-gray-700">
          Eclipse Vert.x is made with ❤️ by the following people
        </div>
        {fullTimeDevelopers !== undefined && (
          <CommunitySection title="Full-time developers" size="large">
            {fullTimeDevelopers.map(c => (
              <CommunityProfile key={c.githubId} profile={c} size="large" />
            ))}
          </CommunitySection>
        )}
        {maintainers !== undefined && (
          <CommunitySection title="Component maintainers" size="medium">
            {maintainers.map(c => (
              <CommunityProfile key={c.githubId} profile={c} size="medium" />
            ))}
          </CommunitySection>
        )}
        {contributors !== undefined && (
          <CommunitySection title="Contributors">
            {contributors.map(c => (
              <CommunityProfile key={c.githubId} profile={c} />
            ))}
          </CommunitySection>
        )}
      </Container>
      <Footer />
    </main>
  )
}

export default Community
