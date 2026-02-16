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
    id: "vertx-5-migration-guide",
    name: "Migrate from Vert.x 4 to 5",
    description: "Migrate from Vert.x 4 to 5",
    category: "migration",
    href: "/vertx-5-migration-guide/",
    repository: "https://github.com/vert-x3/vertx-5-migration-guide/",
    edit: "https://github.com/vert-x3/vertx-5-migration-guide/tree/main/asciidoc",
    artifact: {
      type: "github",
      owner: "vert-x3",
      repo: "vertx-5-migration-guide",
      ref: "main",
    },
  },
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
]

const docs: GuidesDocs = {
  categories,
  entries,
}

export default docs
