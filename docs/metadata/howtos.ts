import { Category, GuidesDoc, GuidesDocs } from "./types"

const categories: Category[] = [
  {
    id: "http-web",
    name: "HTTP & Web",
  },
  {
    id: "deployment",
    name: "Deployment & Fault Tolerance",
  },
  {
    id: "event-bus",
    name: "Event Bus",
  },
  {
    id: "data",
    name: "Data",
  },
  {
    id: "runtime-jvm",
    name: "Runtime & JVM",
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
    id: "graphql-howto",
    name: "Building a GraphQL server",
    description: "Building a GraphQL server",
    category: "http-web",
    href: "/graphql-howto/",
    repository: "https://github.com/vertx-howtos/graphql-howto",
    edit: "https://github.com/vertx-howtos/graphql-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "graphql-howto",
      ref: "master",
    },
  },
  {
    id: "single-page-react-vertx-howto",
    name: "Creating a single-page application with React and Vert.x",
    description: "Single Page Application development with React and Vert.x",
    category: "http-web",
    href: "/single-page-react-vertx-howto/",
    repository: "https://github.com/vertx-howtos/single-page-react-vertx-howto",
    edit: "https://github.com/vertx-howtos/single-page-react-vertx-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "single-page-react-vertx-howto",
      ref: "master",
    },
  },
  {
    id: "web-session-infinispan-howto",
    name: "Web Session Storage with Infinispan Client",
    description: "Web Session Storage with Infinispan Client",
    category: "http-web",
    href: "/web-session-infinispan-howto/",
    repository: "https://github.com/vertx-howtos/web-session-infinispan-howto",
    edit: "https://github.com/vertx-howtos/web-session-infinispan-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "web-session-infinispan-howto",
      ref: "master",
    },
  },
  {
    id: "web-and-oauth2-oidc",
    name: "Securing a Web Application with OAuth2/OpenId Connect",
    description: "Securing a Web Application with OAuth2/OpenId Connect",
    category: "http-web",
    href: "/web-and-oauth2-oidc/",
    repository: "https://github.com/vertx-howtos/web-and-oauth2-oidc",
    edit: "https://github.com/vertx-howtos/web-and-oauth2-oidc/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "web-and-oauth2-oidc",
      ref: "master",
    },
  },
  {
    id: "fido2-webauthn-howto",
    name: "Securing a Web Application with Webauthn/FIDO2",
    description: "Securing a Web Application with Webauthn/FIDO2",
    category: "http-web",
    href: "/fido2-webauthn-howto/",
    repository: "https://github.com/vertx-howtos/fido2-webauthn-howto",
    edit: "https://github.com/vertx-howtos/fido2-webauthn-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "fido2-webauthn-howto",
      ref: "master",
    },
  },

  // Deployment & Fault Tolerance
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
  {
    id: "clustering-kubernetes-howto",
    name: "Clustered Vert.x apps on Kubernetes with Infinispan",
    description:
      "Deploying clustered Vert.x apps on Kubernetes with Infinispan",
    category: "deployment",
    href: "/clustering-kubernetes-howto/",
    repository: "https://github.com/vertx-howtos/clustering-kubernetes-howto",
    edit: "https://github.com/vertx-howtos/clustering-kubernetes-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "clustering-kubernetes-howto",
      ref: "master",
    },
  },
  {
    id: "k8s-client-side-lb-howto",
    name: "Client side load balancing on Kubernetes",
    description:
      "How to perform client side load balancing on Kubernetes with a microservice",
    category: "http-web",
    href: "/k8s-client-side-lb-howto/",
    repository: "https://github.com/vertx-howtos/k8s-client-side-lb-howto",
    edit: "https://github.com/vertx-howtos/k8s-client-side-lb-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "k8s-client-side-lb-howto",
      ref: "main",
    },
  },
  {
    id: "metrics-prometheus-grafana-howto",
    name: "Exposing Prometheus metrics and visualizing them in Grafana",
    description: "Exposing Prometheus metrics and visualizing them in Grafana",
    category: "deployment",
    href: "/metrics-prometheus-grafana-howto/",
    repository:
      "https://github.com/vertx-howtos/metrics-prometheus-grafana-howto",
    edit: "https://github.com/vertx-howtos/metrics-prometheus-grafana-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "metrics-prometheus-grafana-howto",
      ref: "master",
    },
  },
  {
    id: "resilience4j-howto",
    name: "Using Resilience4j with Vert.x",
    description: "Using Resilience4j with Vert.x",
    category: "deployment",
    href: "/resilience4j-howto/",
    repository: "https://github.com/vertx-howtos/resilience4j-howto",
    edit: "https://github.com/vertx-howtos/resilience4j-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "resilience4j-howto",
      ref: "master",
    },
  },

  // Event Bus
  {
    id: "protobuf-eventbus-howto",
    name: "Exchanging Protobuf classes on the Event Bus",
    description: "Exchanging generated Protobuf classes on the Event Bus",
    category: "event-bus",
    href: "/protobuf-eventbus-howto/",
    repository: "https://github.com/vertx-howtos/protobuf-eventbus-howto",
    edit: "https://github.com/vertx-howtos/protobuf-eventbus-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "protobuf-eventbus-howto",
      ref: "master",
    },
  },
  {
    id: "service-proxy-howto",
    name: "Creating an Event Bus service using Vert.x Service Proxy",
    description: "Creating an Event Bus service using Vert.x Service Proxy",
    category: "event-bus",
    href: "/service-proxy-howto/",
    repository: "https://github.com/vertx-howtos/service-proxy-howto",
    edit: "https://github.com/vertx-howtos/service-proxy-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "service-proxy-howto",
      ref: "master",
    },
  },

  // Data
  {
    id: "hibernate-reactive-howto",
    name: "Using Vert.x with Hibernate Reactive",
    description: "Using Vert.x with Hibernate Reactive",
    category: "data",
    href: "/hibernate-reactive-howto/",
    repository: "https://github.com/vertx-howtos/hibernate-reactive-howto",
    edit: "https://github.com/vertx-howtos/hibernate-reactive-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "hibernate-reactive-howto",
      ref: "master",
    },
  },
  {
    id: "async-loading-cache-caffeine-howto",
    name: "Using Caffeine's AsyncLoadingCache in a Vert.x application",
    description: "Using Caffeine's AsyncLoadingCache in a Vert.x application",
    category: "data",
    href: "/async-loading-cache-caffeine-howto/",
    repository:
      "https://github.com/vertx-howtos/async-loading-cache-caffeine-howto",
    edit: "https://github.com/vertx-howtos/async-loading-cache-caffeine-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "async-loading-cache-caffeine-howto",
      ref: "master",
    },
  },

  // Runtime & JVM
  {
    id: "openj9-howto",
    name: "Running Eclipse Vert.x applications with Eclipse OpenJ9",
    description: "Running Eclipse Vert.x applications with Eclipse OpenJ9",
    category: "runtime-jvm",
    href: "/openj9-howto/",
    repository: "https://github.com/vertx-howtos/openj9-howto",
    edit: "https://github.com/vertx-howtos/openj9-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "openj9-howto",
      ref: "master",
    },
  },
  {
    id: "graal-native-image-howto",
    name: "Building a Vert.x Native Image",
    description: "Building a Vert.x Native Image",
    category: "runtime-jvm",
    href: "/graal-native-image-howto/",
    repository: "https://github.com/vertx-howtos/graal-native-image-howto",
    edit: "https://github.com/vertx-howtos/graal-native-image-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "graal-native-image-howto",
      ref: "master",
    },
  },
  {
    id: "executable-jar-docker-howto",
    name: "Creating a container packaged as an executable uber-jar",
    description:
      "Creating a container for a Vert.x app packaged as an executable uber-jar",
    category: "runtime-jvm",
    href: "/executable-jar-docker-howto/",
    repository: "https://github.com/vertx-howtos/executable-jar-docker-howto",
    edit: "https://github.com/vertx-howtos/executable-jar-docker-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "executable-jar-docker-howto",
      ref: "master",
    },
  },
  {
    id: "grpc-web-howto",
    name: "Building a gRPC Web service",
    description: "Building a gRPC Web service",
    category: "http-web",
    href: "/grpc-web-howto/",
    repository: "https://github.com/vertx-howtos/grpc-web-howto",
    edit: "https://github.com/vertx-howtos/grpc-web-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "grpc-web-howto",
      ref: "master",
    },
  },
  {
    id: "jlink-howto",
    name: "Assembling a small runtime image of a modular Vert.x application with jlink",
    description: "Assembling a small runtime image of a modular Vert.x application with jlink",
    category: "runtime-jvm",
    href: "/jlink-howto/",
    repository: "https://github.com/vertx-howtos/jlink-howto",
    edit: "https://github.com/vertx-howtos/jlink-howto/blob/master/README.adoc",
    artifact: {
      type: "github",
      owner: "vertx-howtos",
      repo: "jlink-howto",
      ref: "master",
    },
  },
]

const docs: GuidesDocs = {
  categories,
  entries,
}

export default docs
