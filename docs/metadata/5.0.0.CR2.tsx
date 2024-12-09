import oldDocs from "./4.4.4"
import { clone, find, insert, remove, removeCategory } from "./helpers"

const docs = clone(oldDocs)

// 5.0.0-SNAPSHOT is a pre-release version. Remove this once 5.0.0 is released.
docs.prerelease = true

docs.imagesDir = "java/images" // Can be anything, actually. Just used to resolve relative paths to images.

insert(docs, "vertx-service-resolver", {
  id: "vertx-service-resolver",
  name: "Service Resolver",
  description:
    "Lets Vert.x clients call services using logical service names instead of network addresses for Kubernetes and such.",
  category: "microservices",
  href: "/vertx-service-resolver/java/",
  repository: "https://github.com/eclipse-vertx/vertx-service-resolver",
  edit: "https://github.com/eclipse-vertx/vertx-service-resolver/tree/main/src/main/asciidoc",
  examples:
    "https://github.com/vert-x3/vertx-examples/tree/5.x/service-resolver-examples",
  label: "Preview",
})

insert(docs, "vertx-launcher-application", {
  id: "vertx-launcher-application",
  name: "Application Launcher",
  description:
    "The Vert.x application launcher is a tool which addresses such concerns, without repeating the same code in every project.",
  category: "core",
  href: "/vertx-launcher-application/java/",
  repository: "https://github.com/eclipse-vertx/vertx-launcher",
  edit: "https://github.com/eclipse-vertx/vertx-launcher/tree/main/application/src/main/asciidoc",
  examples: "https://start.vertx.io",
  label: "Preview",
})

// Remove preview labels
delete find(docs, "vertx-mssql-client").label
delete find(docs, "vertx-oracle-client").label
delete find(docs, "vertx-uri-template").label
delete find(docs, "vertx-opentelemetry").label
delete find(docs, "vertx-json-schema").label
delete find(docs, "vertx-http-proxy").label
delete find(docs, "vertx-web-proxy").label
delete find(docs, "vertx-grpc").label

// Update examples
find(docs, "vertx-core").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/core-examples"
find(docs, "vertx-circuit-breaker").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/circuit-breaker-examples"
find(docs, "vertx-cassandra-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/cassandra-examples"
find(docs, "vertx-amqp-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/amqp-examples"
find(docs, "vertx-camel-bridge").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/camel-bridge-examples"
find(docs, "vertx-consul-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/consul-examples"
find(docs, "vertx-openapi").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/openapi-examples"
find(docs, "vertx-web-openapi-router").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/web-examples/src/main/java/io/vertx/example/web/openapi_router"
find(docs, "vertx-grpc").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/grpc-examples"
find(docs, "vertx-junit5").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/junit5-examples"
find(docs, "vertx-kafka-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/kafka-examples"
find(docs, "vertx-lang-kotlin").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/kotlin-examples"
find(docs, "vertx-mail-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/mail-examples"
find(docs, "vertx-dropwizard-metrics").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/metrics-examples"
find(docs, "vertx-micrometer-metrics").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/micrometer-metrics-examples"
find(docs, "vertx-mongo-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/mongo-examples"
find(docs, "vertx-mqtt").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/mqtt-examples"
find(docs, "vertx-openapi").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/openapi-examples"
find(docs, "vertx-redis-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/redis-examples"
find(docs, "vertx-redis-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/redis-examples"
find(docs, "vertx-rx-java2").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/rxjava-2-examples"
find(docs, "vertx-rx-java3").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/rxjava-3-examples"
find(docs, "vertx-service-proxy").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/service-proxy-examples"
find(docs, "vertx-shell").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/shell-examples"
find(docs, "vertx-pg-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples"
find(docs, "vertx-mysql-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples"
find(docs, "vertx-mssql-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples"
find(docs, "vertx-db2-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples"
find(docs, "vertx-oracle-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples"
find(docs, "vertx-jdbc-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples"
find(docs, "vertx-sql-client-templates").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/sql-client-examples#template"
find(docs, "vertx-web").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/web-examples"
find(docs, "vertx-web-client").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/web-client-examples"
find(docs, "vertx-web-graphql").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/web-graphql-examples"
find(docs, "vertx-zipkin").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/zipkin-examples"
find(docs, "vertx-uri-template").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/web-client-examples#uri-templates"
find(docs, "vertx-json-schema").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/json-schema-examples"
find(docs, "vertx-config").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/config-examples"
find(docs, "vertx-health-check").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/health-check-examples"
find(docs, "vertx-http-proxy").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/http-proxy-examples"
// Micrometer Metrics example is complex and consequently moved to how-tos
delete find(docs, "vertx-micrometer-metrics").examples
find(docs, "vertx-opentelemetry").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/opentelemetry-examples"
find(docs, "vertx-stomp").examples =
  "https://github.com/vert-x3/vertx-examples/tree/5.x/stomp-examples"

// hide deprecated entries
find(docs, "vertx-unit").hidden = true
find(docs, "vertx-service-discovery").hidden = true
find(docs, "vertx-web-api-service").hidden = true
find(docs, "vertx-sockjs-service-proxy").hidden = true

// remove old entries
remove(docs, "vertx-io_uring-incubator")
remove(docs, "vertx-lang-groovy")
remove(docs, "vertx-lang-kotlin")
remove(docs, "vertx-rx-java")
remove(docs, "vertx-grpc-netty")
removeCategory(docs, "groovy")

export default docs
