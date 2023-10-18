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
    edit: "https://github.com/eclipse-vertx/vertx-launcher/tree/master/vertx-application-launcher/src/main/asciidoc",
    label: "Technical Preview"
  }
 )

insert(docs, "vertx-virtual-threads",
  {
    id: "vertx-virtual-threads",
    name: "Vert.x Virtual Threads",
    description: "Virtual threads for Vert.x.",
    category: "core",
    href: "/vertx-virtual-threads/java/",
    repository: "https://github.com/eclipse-vertx/vertx-virtual-threads",
    edit: "https://github.com/eclipse-vertx/vertx-launcher/tree/master/vertx-virtual-threads/src/main/asciidoc",
    label: "Technical Preview"
  }
 )

export default docs
