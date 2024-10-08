import { Category, GuidesDoc, GuidesDocs } from "./types"

const categories: Category[] = [
  {
    id: "migration",
    name: "Migration",
  },
  {
    id: "advanced",
    name: "Advanced",
  },
]

const entries: GuidesDoc[] = [
  // Migration guides
  {
    id: "vertx-4-migration-guide",
    name: "Migrate from Vert.x 3 to 4",
    description: "Migrate from Vert.x 3 to 4",
    category: "migration",
    href: "/vertx-4-migration-guide/",
    repository: "https://github.com/vert-x3/vertx-4-migration-guide/",
    edit: "https://github.com/vert-x3/vertx-4-migration-guide/tree/master/asciidoc",
    artifact: {
      type: "github",
      owner: "vert-x3",
      repo: "vertx-4-migration-guide",
      ref: "master",
    },
  },

  // Advanced
  {
    id: "advanced-vertx-guide",
    name: "Advanced Vert.x Guide",
    description: `This guide documents advanced/internal stuff about Vert.x. It 
      aims to explain and discuss Vert.x design, internal APIs, and integration 
      with Netty.`,
    category: "advanced",
    href: "/advanced-vertx-guide/",
    repository: "https://github.com/vert-x3/advanced-vertx-guide",
    edit: "https://github.com/vert-x3/advanced-vertx-guide/tree/master/src/main/asciidoc",
    artifact: {
      type: "maven",
      name: "advanced-vertx-guide",
      version: "1.0.0-SNAPSHOT",
    },
  },
  {
    id: "modular-vertx-guide",
    name: "Modular Vert.x Guide",
    description: "TODO",
    category: "advanced",
    href: "/modular-vertx-guide/",
    repository: "https://github.com/vert-x3/modular-vertx-guide",
    edit: "https://github.com/vert-x3/modular-vertx-guide/tree/master/src/main/asciidoc",
    artifact: {
      type: "maven",
      name: "modular-vertx-guide",
      version: "1.0.0-SNAPSHOT",
    },
  },
]

const docs: GuidesDocs = {
  categories,
  entries,
}

export default docs
