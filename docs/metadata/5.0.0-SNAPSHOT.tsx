import oldDocs from "./4.4.4"
import { clone, insert, remove, removeCategory } from "./helpers"

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
  label: "Preview",
})

// remove old entries
remove(docs, "vertx-grpc-netty")
remove(docs, "vertx-lang-groovy")
remove(docs, "vertx-lang-kotlin")
remove(docs, "vertx-rx-java")
remove(docs, "vertx-rx-java2")
remove(docs, "vertx-rx-java3")
remove(docs, "vertx-service-discovery")
remove(docs, "vertx-sockjs-service-proxy")
remove(docs, "vertx-web-api-service")
removeCategory(docs, "groovy")

export default docs
