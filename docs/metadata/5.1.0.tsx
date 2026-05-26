import oldDocs from "./5.0.0"
import { clone, find, insert, remove, removeCategory } from "./helpers"

const docs = clone(oldDocs)

// Main docs
docs.prerelease = false

docs.imagesDir = "java/images" // Can be anything, actually. Just used to resolve relative paths to images.

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
