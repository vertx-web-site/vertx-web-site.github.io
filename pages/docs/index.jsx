import Layout from "../../components/layouts/Page"
import ReadMoreLink from "../../components/ReadMoreLink"
import Link from "next/link"
import { Box, Database, Globe, Share2, Monitor, Loader, Send, Terminal, Key, Grid, Repeat } from "react-feather"
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

      <Section icon={<Globe className="feather" />}>
        <SectionPart title="Web API Contract" as="/docs/vertx-web-api-contract/java/">
          OpenApi 3 specification for a design first approach and provides a validation framework
        </SectionPart>

        <SectionPart title="Web API Service" as="/docs/vertx-web-api-service/java/">
          Connect your Router built with OpenAPI 3 directly to EventBus services
        </SectionPart>
      </Section>

      <Section icon={<Globe className="feather" />}>
        <SectionPart title="GraphQL" as="/docs/vertx-web-graphql/java/">
          This module offers integration and support for writing Vert.x tests with JUnit 5
        </SectionPart>
      </Section>

      <Section icon={<Grid className="feather" />}>
        <SectionPart title="Hazelcast Clustering" as="/docs/vertx-hazelcast/java/">
          Cluster manager implementation that uses Hazelcast
        </SectionPart>

        <SectionPart title="Infinispan Clustering" as="/docs/vertx-infinispan/java/">
          Cluster manager implementation that uses Infinispan
        </SectionPart>

        <SectionPart title="Apache Ignite Clustering" as="/docs/vertx-infinispan/java/">
          Cluster manager implementation that uses Infinispan
        </SectionPart>
      </Section>

      <Section icon={<Repeat className="feather" />}>
        <SectionPart title="Vert.x JUnit 5" as="/docs/vertx-junit5/java/">
          Vert.x supports reactive streams so your applications can interoperate with other reactive systems such as Akka or Project Reactor
        </SectionPart>

        <SectionPart title="Vert.x Unit" as="/docs/vertx-unit/java/">
          Vert.x-Unit is an unit testing tool-kit especially design to work well with asynchronous code
        </SectionPart>
      </Section>

      <Section icon={<Globe className="feather" />}>
        <SectionPart title="JSON Schema" as="/docs/vertx-json-schema/java/">
          An extendable implementation for Json Schema specification, validate
          every json structure, asynchronously
        </SectionPart>
      </Section>

      <Section icon={<Key className="feather" />}>
        <SectionPart title="Auth common" as="/docs/vertx-auth-common/java/">
          The Common Auth APIs
        </SectionPart>

        <SectionPart title="JDBC Auth" as="/docs/vertx-auth-jdbc/java/">
          Auth implementation backed by JDBC
        </SectionPart>

        <SectionPart title="JWT Auth" as="/docs/vertx-auth-jwt/java/">
          Auth implementation using JSON web tokens (JWT)
        </SectionPart>

        <SectionPart title="Shiro Auth" as="/docs/vertx-auth-shiro/java/">
          Auth implementation using Apache Shiro
        </SectionPart>

        <SectionPart title="Mongo Auth" as="/docs/vertx-auth-mongo/java/">
          Auth implementation using MongoDB
        </SectionPart>

        <SectionPart title="Oauth2 Auth" as="/docs/vertx-auth-oauth2/java/">
          Auth implementation for OAuth2
        </SectionPart>

        <SectionPart title=".htdigest Auth" as="/docs/vertx-auth-htdigest/java/">
          .htdigest file to query user information
        </SectionPart>
      </Section>

      <Section icon={<Database className="feather" />}>
        <SectionPart title="PostgreSQL Client" as="/docs/vertx-pg-client/java/">
          A PostgreSQL client focusing on scalability and low overhead.
        </SectionPart>

        <SectionPart title="MySQL Client" as="/docs/vertx-mysql-client/java/">
          A lightweight, event-driven client for MySQL.
        </SectionPart>
      </Section>

      <Section icon={<Database className="feather" />}>
        <SectionPart title="Mongo Client" as="/docs/vertx-mongo-client/java/">
          Mongo client
        </SectionPart>

        <SectionPart title="Redis Client" as="/docs/vertx-redis-client/java/">
          Redis client
        </SectionPart>

        <SectionPart title="Cassandra Client" as="/docs/vertx-cassandra-client/java/">
          Cassandra client
        </SectionPart>
      </Section>

      <Section icon={<Send className="feather" />}>
        <SectionPart title="Kafka client" as="/docs/vertx-stomp/java/">
          A client to interact with Apache Kafka
        </SectionPart>

        <SectionPart title="AMQP Client" as="/docs/vertx-amqp-client/java/">
          A client for interacting with an AMQP 1.0 broker or router
        </SectionPart>

        <SectionPart title="RabbitMQ Client" as="/docs/vertx-rabbitmq-client/java/">
          A client to interact with RabbitMQ
        </SectionPart>
      </Section>

      <Section icon={<Send className="feather" />}>
        <SectionPart title="Mail Client" as="/docs/vertx-mail-client/java/">
          Vert.x provides a simple SMTP mail client so you can send emails from your applications
        </SectionPart>

        <SectionPart title="STOMP" as="/docs/vertx-stomp/java/">
          An implementation of the STOMP protocol for client and server
        </SectionPart>

        <SectionPart title="Consul client" as="/docs/vertx-consul-client/java/">
          A client to interact with Consul
        </SectionPart>
      </Section>

      <Section icon={<Send className="feather" />}>
        <SectionPart title="TCP Eventbus Bridge" as="/docs/vertx-tcp-eventbus-bridge/java/">
          An eventbus bridge that lets you interact with Vert.x from any application thanks to a TCP socket.
        </SectionPart>

        <SectionPart title="Camel Bridge" as="/docs/vertx-camel-bridge/java/">
          An eventbus bridge that lets you interact with Apache Camel endpoints and routes
        </SectionPart>
      </Section>

      <Section icon={<Monitor className="feather" />}>
        <SectionPart title="Zipkin" as="/docs/vertx-zipkin/java/">
          Tracing Vert.x services with Zipkin
        </SectionPart>

        <SectionPart title="Opentracing" as="/docs/vertx-opentracing/java/">
          Tracing Vert.x services with OpenTracing
        </SectionPart>
      </Section>

      <Section icon={<Monitor className="feather" />}>
        <SectionPart title="Metrics using Dropwizard" as="/docs/vertx-dropwizard-metrics/java/">
          This component captures metrics from Vert.x core components and exposes them using Dropwizard
        </SectionPart>

        <SectionPart title="Metrics using Micrometer" as="/docs/vertx-micrometer-metrics/java/">
          This component captures metrics from Vert.x core components and exposes them using Micrometer
        </SectionPart>

        <SectionPart title="Health Check" as="/docs/vertx-health-check/java/">
          A simple way to expose health checks
        </SectionPart>
      </Section>

      <Section icon={<Share2 className="feather" />}>
        <SectionPart title="gRPC" as="/docs/vertx-grpc/java/">
          Implement gRPC Clients and Servers for Vert.x
        </SectionPart>

        <SectionPart title="Service Proxies" as="/docs/vertx-service-proxy/java/">
          Proxies allow remote event bus services to be called as if they were local
        </SectionPart>

        <SectionPart title="SockJS Service Proxies" as="/docs/vertx-sockjs-service-proxy/java/">
          Allow event bus services to be called from JavaScript (browser or Node.js)
        </SectionPart>
      </Section>

      <Section icon={<Loader className="feather" />}>
        <SectionPart title="RxJava 2" as="/docs/vertx-rx/java2/">
          Don't like callback-style APIs? Vert.x provides Rx-ified versions for most of its APIs so you can use those if you prefer.
        </SectionPart>

        <SectionPart title="RxJava 1" as="/docs/vertx-rx/java/">
          RxJava 1 support
        </SectionPart>
      </Section>

      <Section icon={<Loader className="feather" />}>
        <SectionPart title="Reactive Streams" as="/docs/vertx-reactive-streams/java/">
          Vert.x supports reactive streams so your applications can interoperate with other reactive systems such as Akka or Project Reactor
        </SectionPart>
      </Section>

      <Section icon={<Share2 className="feather" />}>
        <SectionPart title="Service Discovery" as="/docs/vertx-service-discovery/java/">
          Publish, lookup and bind any type of services
        </SectionPart>

        <SectionPart title="Config" as="/docs/vertx-config/java/">
           An extensible way to configure Vert.x applications
        </SectionPart>

        <SectionPart title="Circuit Breaker" as="/docs/vertx-circuit-breaker/java/">
          The circuit breaker pattern
        </SectionPart>
      </Section>

      <Section icon={<Database className="feather" />}>
        <SectionPart title="MQTT" as="/docs/vertx-mqtt/java/">
          Client/server for MQTT. The server is able to handle connections, communication and messages exchange with remote MQTT clients.
          The client is 3.1.1 MQTT compliant with a bunch of methods for connecting/disconnecting to a broker, publishing messages
          and subscribing to topics.
        </SectionPart>
      </Section>

      <Section icon={<Terminal className="feather" />}>
        <SectionPart title="Shell" as="/docs/vertx-shell/java/">
          This component lets you interact with your Vert.x application using a CLI interface
        </SectionPart>
      </Section>
    </Layout>
  )
}

export default Docs
