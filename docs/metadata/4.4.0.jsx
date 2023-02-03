import { clone } from "./helpers"
import oldDocs from "./4.3.0"
import { insert, remove, find } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-openapi",
  {
    id: "vertx-openapi",
    name: "Vert.x OpenAPI",
    description: "Vert.x OpenAPI extends Vert.x to support OpenAPI 3 in version 3.0 and 3.1. It offers an API to parse and validate contracts.",
    category: "standards",
    href: "/vertx-openapi/java/",
    repository: "https://github.com/eclipse-vertx/vertx-openapi",
    edit: "https://github.com/eclipse-vertx/vertx-openapi/tree/master/vertx-openapi/src/main/asciidoc",
    label: "Technical Preview"
  }
 )

insert(docs, "vertx-web-openapi-router",
  {
    id: "vertx-web-openapi-router",
    name: "Vert.x Web OpenAPI Router",
    description: "Vert.x OpenAPI Router is based on Vert.x OpenAPI and provides the router functionality.",
    category: "standards",
    href: "/vertx-web-openapi-router/java/",
    repository: "https://github.com/vert-x3/vertx-web",
    edit: "https://github.com/vert-x3/vertx-web/tree/master/vertx-web/vertx-web-openapi-router/src/main/asciidoc",
    label: "Technical Preview"
  }
 )

export default docs
