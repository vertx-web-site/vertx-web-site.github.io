import Layout from "../components/layouts/Index"
import { fetchGitHubStars } from "../components/lib/github-stars"

export async function getStaticProps() {
  let stars = (await fetchGitHubStars("eclipse-vertx", "vert.x")) || null

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
