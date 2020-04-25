import Layout from "../../components/layouts/Page"
import Link from "next/link"
import { Fragment } from "react"

const pages = {
  "Core": {
    "Java": "/docs/vertx-core/java/",
    "Groovy": "/docs/vertx-core/groovy/",
    "JavaScript": "/docs/vertx-core/js/"
  },
  "Web":  {
    "Java": "/docs/vertx-web/java/",
    "Groovy": "/docs/vertx-web/groovy/",
    "JavaScript": "/docs/vertx-web/js/"
  }
}

export default () => {
  let sections = []

  for (let title in pages) {
    let page = pages[title]

    let links = []
    for (let lang in page) {
      let href = page[lang]
      links.push(<li key={`${title}-${lang}`}><Link href="/docs/[...slug]" as={href}><a>{lang}</a></Link></li>)
    }

    sections.push(
      <Fragment key={title}>
        <h3>{title}</h3>
        <ul>
          {links}
        </ul>
      </Fragment>
    )
  }

  return (
    <Layout meta={{ title: "Documentation" }}>
      <h2>Documentation</h2>
      {sections}
    </Layout>
  )
}
