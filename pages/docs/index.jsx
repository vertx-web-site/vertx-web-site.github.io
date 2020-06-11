import Layout from "../../components/layouts/Page"
import ReadMoreLink from "../../components/ReadMoreLink"
import Link from "next/link"
import { Book, Box, CheckCircle, Database, Feather, Globe, Inbox, Search, Share2, Monitor, PhoneCall, Send, Terminal, Key, Grid } from "react-feather"
import "./index.scss"

const Section = ({ icon, children }) => {
  let numChildren = 1
  if (Array.isArray(children)) {
    numChildren = Math.min(2, children.length)
  }

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
          The Vert.x core APIs contain the backbone for writing Vert.x applications and low-level support for HTTP, TCP, UDP, file system, asynchronous streams and many other building blocks.
          It is also used by many other components of Vert.x.
        </SectionPart>
      </Section>

      <Section icon={<Globe className="feather" />}>
        <SectionPart title="Web" as="/docs/vertx-web/java/">
          A tool-kit for writing sophisticated modern web applications and HTTP microservices.
        </SectionPart>

        <SectionPart title="Web Client" as="/docs/vertx-web-client/java/">
          An easy-to-use client for HTTP and HTTP/2 with many advanced features.
        </SectionPart>

        <SectionPart title="Web Validation" as="/docs/vertx-web-validation/java/">
          A library to declaratively parse and validate incoming Vert.x Web HTTP requests.
        </SectionPart>

        <SectionPart title="Web OpenAPI" as="/docs/vertx-web-openapi/java/index.html">
         Extends Vert.x Web to support OpenAPI 3, bringing a simple interface for building web routers that conform to OpenAPI contracts.
        </SectionPart>

        <SectionPart title="Web API Service" as="/docs/vertx-web-api-service/java/">
          Directly connect your OpenAPI 3 web routers to event-bus services.
        </SectionPart>

        <SectionPart title="GraphQL" as="/docs/vertx-web-graphql/java/">
          Implement GraphQL servers with Vert.x web.
        </SectionPart>
      </Section>

      <Section icon={<Grid className="feather" />}>
        <SectionPart title="Hazelcast Clustering" as="/docs/vertx-hazelcast/java/">
          Cluster manager implementation that uses Hazelcast.
        </SectionPart>

        <SectionPart title="Infinispan Clustering" as="/docs/vertx-infinispan/java/">
          Cluster manager implementation that uses Infinispan.
        </SectionPart>

        <SectionPart title="Apache Ignite Clustering" as="/docs/vertx-ignite/java/">
          Cluster manager implementation that uses Apache Ignite.
        </SectionPart>
      </Section>

      <Section icon={<CheckCircle className="feather" />}>
        <SectionPart title="Vert.x JUnit 5" as="/docs/vertx-junit5/java/">
          Vert.x supports for JUnit 5 testing.
        </SectionPart>

        <SectionPart title="Vert.x Unit" as="/docs/vertx-unit/java/">
          A unit testing tool-kit especially designed to work well with asynchronous code, also includes JUnit 4 support.
        </SectionPart>
      </Section>

      <Section icon={<Book className="feather" />}>
        <SectionPart title="JSON Schema" as="/docs/vertx-json-schema/java/">
          An extensible implementation of the Json Schema specification to validate every JSON data structure, asynchronously.
        </SectionPart>
      </Section>

      <Section icon={<Key className="feather" />}>
        <SectionPart title="Auth common" as="/docs/vertx-auth-common/java/">
          Common APIs for authentication and authorization for your Vert.x applications, backed by several providers.
        </SectionPart>

        <SectionPart title="Oauth2 Auth" as="/docs/vertx-auth-oauth2/java/">
          OAuth2 (and to some extent OpenID Connect) implementation.
        </SectionPart>

        <SectionPart title="JWT Auth" as="/docs/vertx-auth-jwt/java/">
          JSON web tokens (JWT) implementation.
        </SectionPart>

        <SectionPart title="Webauthn Auth" as="/docs/vertx-auth-webauthn/java/">
          FIDO2 WebAuthn (password-less) implementation.
        </SectionPart>

        <SectionPart title="Sql Client Auth" as="/docs/vertx-auth-sql-client/java/">
          Authentication and authorization support based on the Vert.x SQL client and a relational database.
        </SectionPart>

        <SectionPart title="Mongo Auth" as="/docs/vertx-auth-mongo/java/">
          Authentication and authorization support based on MongoDB.
        </SectionPart>

        <SectionPart title="Properties Auth" as="/docs/vertx-auth-properties/java/">
          Authentication and authorization support based on Java properties files.
        </SectionPart>

        <SectionPart title="LDAP Auth" as="/docs/vertx-auth-ldap/java/">
          Implementation using JDK built-in LDAP capabilities.
        </SectionPart>

        <SectionPart title=".htpasswd Auth" as="/docs/vertx-auth-htpasswd/java/">
          Authentication and authorization support based on <code>.htpasswd</code> files.
        </SectionPart>

        <SectionPart title=".htdigest Auth" as="/docs/vertx-auth-htdigest/java/">
          Authentication and authorization support based on <code>.htdigest</code> files.
        </SectionPart>
      </Section>

      <Section icon={<Database className="feather" />}>
        <SectionPart title="PostgreSQL Client" as="/docs/vertx-pg-client/java/">
          A PostgreSQL client focusing on scalability and low overhead.
        </SectionPart>

        <SectionPart title="MySQL Client" as="/docs/vertx-mysql-client/java/">
          A lightweight, event-driven client for MySQL.
        </SectionPart>

        <SectionPart title="SQL Client Templates" as="/docs/vertx-sql-client-templates/java/">
          A small library designed to facilitate the execution and data manipulation of SQL queries.
        </SectionPart>

        <SectionPart title="Mongo Client" as="/docs/vertx-mongo-client/java/">
          MongoDB client.
        </SectionPart>

        <SectionPart title="Redis Client" as="/docs/vertx-redis-client/java/">
          Redis client.
        </SectionPart>

        <SectionPart title="Cassandra Client" as="/docs/vertx-cassandra-client/java/">
          Apache Cassandra client.
        </SectionPart>
      </Section>

      <Section icon={<Send className="feather" />}>
        <SectionPart title="Kafka client" as="/docs/vertx-kafka-client/java/">
          A client for Apache Kafka.
        </SectionPart>

        <SectionPart title="AMQP Client" as="/docs/vertx-amqp-client/java/">
          A client for AMQP 1.0 brokers and routers.
        </SectionPart>

        <SectionPart title="RabbitMQ Client" as="/docs/vertx-rabbitmq-client/java/">
          A client for RabbitMQ brokers.
        </SectionPart>

        <SectionPart title="MQTT" as="/docs/vertx-mqtt/java/">
          A client and server for MQTT, compliant with MQTT 3.1.1.
        </SectionPart>
      </Section>

      <Section icon={<Inbox className="feather" />}>
        <SectionPart title="Mail Client" as="/docs/vertx-mail-client/java/">
          A SMTP client to send emails from your applications.
        </SectionPart>

        <SectionPart title="STOMP" as="/docs/vertx-stomp/java/">
          A client and server implementation of the STOMP protocol.
        </SectionPart>

        <SectionPart title="Consul client" as="/docs/vertx-consul-client/java/">
          A client for Consul.
        </SectionPart>
      </Section>

      <Section icon={<Share2 className="feather" />}>
        <SectionPart title="TCP Eventbus Bridge" as="/docs/vertx-tcp-eventbus-bridge/java/">
          An event-bus bridge that lets you interact with Vert.x from any application over a simple TCP-based protocol.
        </SectionPart>

        <SectionPart title="Camel Bridge" as="/docs/vertx-camel-bridge/java/">
          An event-bus bridge that lets you interact with Apache Camel endpoints and routes.
        </SectionPart>
      </Section>

      <Section icon={<Monitor className="feather" />}>
        <SectionPart title="Zipkin" as="/docs/vertx-zipkin/java/">
          Distributed tracing with Zipkin.
        </SectionPart>

        <SectionPart title="Opentracing" as="/docs/vertx-opentracing/java/">
          Distributed tracing with OpenTracing.
        </SectionPart>

        <SectionPart title="Metrics using Dropwizard" as="/docs/vertx-dropwizard-metrics/java/">
          Captures metrics from Vert.x core components and exposes them using Dropwizard.
        </SectionPart>

        <SectionPart title="Metrics using Micrometer" as="/docs/vertx-micrometer-metrics/java/">
          Captures metrics from Vert.x core components and exposes them using Micrometer.
        </SectionPart>

        <SectionPart title="Health Check" as="/docs/vertx-health-check/java/">
          A simple API to expose health checks over HTTP.
        </SectionPart>
      </Section>

      <Section icon={<PhoneCall className="feather" />}>
        <SectionPart title="gRPC" as="/docs/vertx-grpc/java/">
          Implement gRPC clients and servers with Vert.x.
        </SectionPart>

        <SectionPart title="Service Proxies" as="/docs/vertx-service-proxy/java/">
          Proxies allow remote event bus services to be called as if they were local.
        </SectionPart>

        <SectionPart title="SockJS Service Proxies" as="/docs/vertx-sockjs-service-proxy/java/">
          Allow event bus services to be called from JavaScript (web browser or Node.js).
        </SectionPart>
      </Section>

      <Section icon={<Feather className="feather" />}>
        <SectionPart title="RxJava 2" as="/docs/vertx-rx/java2/">
          RxJava 2 bindings for the Vert.x APIs, modules and clients.
        </SectionPart>

        <SectionPart title="RxJava 1" as="/docs/vertx-rx/java/">
          RxJava 1 bindings for the Vert.x APIs, modules and clients.
        </SectionPart>

        <SectionPart title="Reactive Streams" as="/docs/vertx-reactive-streams/java/">
          Reactive streams support so your applications can interoperate with other reactive systems such as Akka and Project Reactor.
        </SectionPart>
      </Section>

      <Section icon={<Search className="feather" />}>
        <SectionPart title="Service Discovery" as="/docs/vertx-service-discovery/java/">
          Publish, lookup and bind any type of service.
        </SectionPart>

        <SectionPart title="Config" as="/docs/vertx-config/java/">
          An extensible way to configure Vert.x applications.
        </SectionPart>

        <SectionPart title="Circuit Breaker" as="/docs/vertx-circuit-breaker/java/">
          Implementation of the circuit-breaker pattern to mitigate failures.
        </SectionPart>
      </Section>

      <Section icon={<Terminal className="feather" />}>
        <SectionPart title="Shell" as="/docs/vertx-shell/java/">
          Interact with your Vert.x application using a CLI interface.
        </SectionPart>
      </Section>
    </Layout>
  )
}

export default Docs
