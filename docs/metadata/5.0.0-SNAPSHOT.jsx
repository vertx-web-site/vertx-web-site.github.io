import oldDocs from "./4.4.4"
import { clone, insert, remove, find } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-web",
  {
    id: "vertx-application-launcher",
    name: "Vert.x Application Launcher",
    description: "Helps to launch Vert.x applications without repeating the same code in every project.",
    category: "core",
    href: "/vertx-application-launcher/java/",
    repository: "https://github.com/eclipse-vertx/vertx-launcher",
    edit: "https://github.com/eclipse-vertx/vertx-launcher/tree/main/vertx-application-launcher/src/main/asciidoc",
    label: "Technical Preview"
  }
 )

insert(docs, "vertx-service-resolver",
  {
    id: "vertx-service-resolver",
    name: "Vert.x Service Resolver",
    description: "Lets Vert.x clients call services using logical service names instead of network addresses for Kubernetes and such.",
    category: "microservices",
    href: "/vertx-service-resolver/java/",
    repository: "https://github.com/eclipse-vertx/vertx-service-resolver",
    edit: "https://github.com/eclipse-vertx/vertx-service-resolver/tree/main/vertx-service-resolver/src/main/asciidoc",
    label: "Technical Preview"
  }
 )

// remove old entries
remove(docs, "vertx-service-discovery")
remove(docs, "vertx-grpc-netty")
remove(docs, "vertx-rx-java")

export default docs
