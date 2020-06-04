import Layout from "../../components/layouts/Page"
import ReadMoreLink from "../../components/ReadMoreLink"
import Link from "next/link"
import { Box, Database, Globe, Share2 } from "react-feather"
import "./index.scss"

const Section = ({ icon, children }) => {
  let numChildren = 1
  if (Array.isArray(children)) {
    numChildren = children.length
  }

  numChildren = (numChildren - 1) % 3 + 1

  return (
    <section className="docs-index-section">
      <div className="docs-index-section-header">
        {icon}
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

      <p>{children}</p>

      <ReadMoreLink href="/docs/[...slug]" as={as}>
        <a>Read</a>
      </ReadMoreLink>
    </div>
  )
}

const Docs = () => {
  return (
    <Layout meta={{ title: "Documentation" }}>
      <h2>Documentation</h2>

      <Section icon={<Box className="feather" />}>
        <SectionPart title="Core" as="/docs/vertx-core/java/">
          Vert.x core contains fairly low level functionality including support
          for HTTP, TCP, file system access, and various other features. You can
          use it directly in your own applications. It&rsquo;s also used by many of
          the other components of Vert.x.
        </SectionPart>
      </Section>

      <Section icon={<Globe className="feather" />}>
        <SectionPart title="Web" as="/docs/vertx-web/java/">
          Vert.x-Web is a tool-kit for writing sophisticated modern web
          applications and HTTP microservices.
        </SectionPart>

        <SectionPart title="Web Client" as="/docs/vertx-web-client/java/">
          Vert.x Web Client is an easy-to-use client for HTTP and HTTP/2 with
          a large number of advanced features.
        </SectionPart>
      </Section>

      <Section icon={<Database className="feather" />}>
        <SectionPart title="PostgreSQL Client" as="/docs/vertx-pg-client/java/">
          A PostgreSQL client focusing on scalability and low overhead.
        </SectionPart>

        <SectionPart title="MySQL Client" as="/docs/vertx-mysql-client/java/">
          A lightweight, event-driven client for MySQL.
        </SectionPart>

        <SectionPart title="DB2 Client" as="/docs/vertx-db2-client/java/">
          TODO
        </SectionPart>
      </Section>

      <Section icon={<Share2 className="feather" />}>
        <SectionPart title="gRPC" as="/docs/vertx-grpc/java/">
          Implement gRPC Clients and Servers for Vert.x.
        </SectionPart>
      </Section>
    </Layout>
  )
}

export default Docs
