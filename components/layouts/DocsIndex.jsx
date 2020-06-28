import Layout from "./Page"
import ReadMoreLink from "../ReadMoreLink"
import ScrollLink from "../ScrollLink"
import Link from "next/link"
import "./DocsIndex.scss"

const Section = ({ icon, children, id, name }) => {
  let numChildren = 1
  if (Array.isArray(children)) {
    numChildren = Math.min(2, children.length)
  }

  return (
    <section className="docs-index-section" id={id}>
      <div className="docs-index-section-header">
        <h3>{icon} {name}</h3>
      </div>
      <div className={`docs-index-section-content docs-index-section-content-${numChildren}`}>
        {children}
      </div>
    </section>
  )
}

const SectionPart = ({ title, as, children }) => {
  return (
    <div className="docs-index-section-part">
      <h3>
        <Link href="/docs/[...slug]" as={as}>
          <a>{title}</a>
        </Link>
      </h3>

      <p className="docs-index-section-content-summary">{children}</p>

      <ReadMoreLink href="/docs/[...slug]" as={as}>
        <a>Read</a>
      </ReadMoreLink>
    </div>
  )
}

const Docs = ({ metadata, version }) => {
  let versionPath = ""
  if (version !== undefined) {
    versionPath = `/${version}`
  }

  return (
    <Layout meta={{ title: "Documentation" }}>
      <div className="docs-index-main">
        <aside>
          <div className="docs-index-aside-main">
            <h2>Documentation</h2>
            <div className="docs-index-aside-content">
              <div className="docs-index-toc">
                <ul>
                  {metadata.metadata.categories.map(c => (
                    <li key={c.id}>
                      <ScrollLink href={`#${c.id}`}>{c.name}</ScrollLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <div className="docs-index-content">
          <h2>Documentation</h2>

          {metadata.metadata.categories.map(category => (
            <Section key={category.id} icon={category.icon} id={category.id} name={category.name}>
              {metadata.metadata.entries.filter(e => e.category === category.id).map(entry => (
                <SectionPart key={entry.id} title={entry.name} as={`/docs${versionPath}${entry.href}`}>
                  {entry.description}
                </SectionPart>
              ))}
            </Section>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Docs
