import { GuidesDoc } from "./types"

const guides: GuidesDoc[] = [
  {
    id: "advanced-vertx-guide",
    name: "Advanced Vert.x Guide",
    description: `This guide documents advanced/internal stuff about Vert.x. It 
      aims to explain and discuss Vert.x design, internal APIs, and integration 
      with Netty.`,
    category: "guides",
    href: "/advanced-vertx-guide/",
    repository: "https://github.com/vert-x3/advanced-vertx-guide",
    edit: "https://github.com/vert-x3/advanced-vertx-guide/tree/master/src/main/asciidoc",
    artifactName: "advanced-vertx-guide",
    artifactVersion: "1.0.0-SNAPSHOT",
  },
  {
    id: "modular-vertx-guide",
    name: "Modular Vert.x Guide",
    description: "TODO",
    category: "guides",
    href: "/modular-vertx-guide/",
    repository: "https://github.com/vert-x3/modular-vertx-guide",
    edit: "https://github.com/vert-x3/modular-vertx-guide/tree/master/src/main/asciidoc",
    artifactName: "modular-vertx-guide",
    artifactVersion: "1.0.0-SNAPSHOT",
  },
]

export default guides
