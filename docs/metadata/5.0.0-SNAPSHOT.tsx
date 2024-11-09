import oldDocs from "./4.4.4"
import { clone, find, insert, remove, removeCategory } from "./helpers"

const docs = clone(oldDocs)

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
  examples: "https://github.com/vert-x3/vertx-examples/tree/5.x/service-resolver-examples",
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
delete find(docs, "vertx-openapi").label
delete find(docs, "vertx-web-openapi-router").label
delete find(docs, "vertx-grpc").label

// Update examples
find(docs, "vertx-core").examples = "https://github.com/vert-x3/vertx-examples/tree/5.x/core-examples"

// remove old entries
remove(docs, "vertx-io_uring-incubator")
remove(docs, "vertx-grpc-netty")
remove(docs, "vertx-lang-groovy")
remove(docs, "vertx-lang-kotlin")
remove(docs, "vertx-rx-java")
remove(docs, "vertx-service-discovery")
remove(docs, "vertx-sockjs-service-proxy")
remove(docs, "vertx-web-api-service")
removeCategory(docs, "groovy")

export default docs
