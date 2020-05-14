import Layout from "../../components/layouts/Page"
import POSTS from "../../components/blog/get-all-posts"

export async function getStaticPaths() {
  let paths = POSTS.map(p => ({ params: { slug: p.slug } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let post = POSTS.find(p => p.slug === params.slug)
  return {
    props: post
  }
}

export default ({ filename }) => {
  let post = require(`../../blog/${filename}`)
  let Component = post.default

  return (
    <Layout meta={{ title: `${post.meta.title} | Blog` }}>
      <Component />
    </Layout>
  )
}
