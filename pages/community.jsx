import Layout from "../components/layouts/Community"
import CommunityProfile from "../components/community/CommunityProfile"
import CommunitySection from "../components/community/CommunitySection"

const Community = () => {
  return (
    <Layout>
      <CommunitySection title="Full-time developers">
        <CommunityProfile githubId="vietj" />
      </CommunitySection>
    </Layout>
  )
}

export default Community
