import { Category, GuidesDoc, GuidesDocs } from "./types"

const categories: Category[] = [
  {
    id: "http-web",
    name: "HTTP & Web",
  },
  {
    id: "deployment",
    name: "Deployment & Fault tolerance",
  },
  {
    id: "event-bus",
    name: "Event bus",
  },
  {
    id: "data",
    name: "Data",
  },
  {
    id: "runtime-jvm",
    name: "Runtime & JVM",
  },
  {
    id: "advanced",
    name: "Advanced",
  },
]

const entries: GuidesDoc[] = [
  // HTTP & Web
  {
    id: "http-client-howto",
    name: "Performing HTTP requests to other services",
    description: "Performing HTTP requests to other services",
    category: "http-web",
    href: "/http-client-howto/",
    repository: "https://github.com/vertx-howtos/http-client-howto",
    edit: "https://github.com/vertx-howtos/http-client-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "http-client-howto",
      ref: "master",
    },
  },
  {
    id: "web-and-openapi-howto",
    name: "Creating a web router from an OpenAPI contract",
    description: "Use your OpenAPI contract to create a Vert.x Web Router",
    category: "http-web",
    href: "/web-and-openapi-howto/",
    repository: "https://github.com/vertx-howtos/web-and-openapi-howto",
    edit: "https://github.com/vertx-howtos/web-and-openapi-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "web-and-openapi-howto",
      ref: "master",
    },
  },

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
    category: "runtime-jvm",
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
    category: "deployment",
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
    category: "deployment",
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

const docs: GuidesDocs = {
  categories,
  entries,
}

export default docs
