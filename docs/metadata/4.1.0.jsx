import { clone } from "./helpers"
import oldDocs from "./4.0.3"
import { insert } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-opentracing",
    {
        id: "vertx-opentelemetry",
        name: "OpenTelemetry",
        description: "Distributed tracing with OpenTelemetry.",
        category: "monitoring",
        href: "/vertx-opentelemetry/java/",
        repository: "https://github.com/eclipse-vertx/vertx-tracing/tree/master/vertx-opentelemetry",
        edit: "https://github.com/eclipse-vertx/vertx-tracing/tree/master/vertx-opentelemetry/src/main/asciidoc",
        label: "Technical Preview"
    }
)

insert(docs, "vertx-mail-client",
    {
        id: "vertx-http-proxy",
        name: "Vert.x Http Proxy",
        description: "A reverse proxy based on Vert.x, it aims to implement reusable reverse proxy logic to focus on higher concerns.",
        category: "integration",
        href: "/vertx-http-proxy/java/",
        repository: "https://github.com/eclipse-vertx/vertx-http-proxy/tree/master",
        edit: "https://github.com/eclipse-vertx/vertx-http-proxy/tree/master/src/main/asciidoc",
        label: "Technical Preview"
    }
)

// Mark this version as a prerelease. Prereleases can be selected manually
// from the dropdown menu on the docs page but the default entry is still
// the latest GA release.
docs.prerelease = true

// force title
docs.title = "4.1.0.Beta1"

export default docs
