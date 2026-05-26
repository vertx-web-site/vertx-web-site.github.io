import oldDocs from "./5.0.12"
import { clone, insert } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-eventbus-bridge-grpc", {
  id: "vertx-eventbus-bridge-grpc",
  name: "gRPC Eventbus Bridge",
  description:
    "An event-bus bridge that lets you interact with Vert.x from any application over gRPC protocol.",
  category: "event-bus-bridges",
  href: "/vertx-eventbus-bridge-grpc/java/",
  repository: "https://github.com/eclipse-vertx/vertx-eventbus-bridges",
  edit: "https://github.com/eclipse-vertx/vertx-eventbus-bridges/tree/main/vertx-eventbus-bridge-grpc/src/main/asciidoc",
  examples:
    "https://github.com/vert-x3/vertx-examples/tree/5.x/grpc-eventbus-bridge-examples",
  label: "Preview",
})

export default docs
