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
    category: "guides",
    href: "/modular-vertx-guide/",
    repository: "https://github.com/vert-x3/modular-vertx-guide",
    edit: "https://github.com/vert-x3/modular-vertx-guide/tree/master/src/main/asciidoc",
    artifact: {
      type: "maven",
      name: "modular-vertx-guide",
      version: "1.0.0-SNAPSHOT",
    },
  },
  {
    id: "aws-native-image-lambda-howto",
    name: "Native functions with AWS Lambda",
    description: "Deploying a Vert.x Native Image function with AWS Lambda",
    category: "howtos",
    href: "/aws-native-image-lambda-howto/",
    repository: "https://github.com/vertx-howtos/aws-native-image-lambda-howto",
    edit: "https://github.com/vertx-howtos/aws-native-image-lambda-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "aws-native-image-lambda-howto",
      ref: "master",
    },
  },
  {
    id: "knative-serving-howto",
    name: "Knative services",
    description: "Deploying a Knative service powered by Vert.x",
    category: "howtos",
    href: "/knative-serving-howto/",
    repository: "https://github.com/vertx-howtos/knative-serving-howto",
    edit: "https://github.com/vertx-howtos/knative-serving-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "knative-serving-howto",
      ref: "master",
    },
  },
]

export default guides
