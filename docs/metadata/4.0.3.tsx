import oldDocs from "./4.0.2"
import { clone, insert } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "mutiny", {
  id: "vertx-mutiny-bindings",
  name: "Mutiny",
  description:
    "Mutiny is an intuitive event-driven reactive programming library for Java. The Vert.x bindings simplify reactive programming for both pure Vert.x and Quarkus applications.",
  category: "reactive",
  href: "https://smallrye.io/smallrye-mutiny/",
  repository: "https://github.com/smallrye/smallrye-reactive-utils",
  edit: "https://github.com/smallrye/smallrye-mutiny/tree/main/documentation/src/main/jekyll",
})

export default docs
