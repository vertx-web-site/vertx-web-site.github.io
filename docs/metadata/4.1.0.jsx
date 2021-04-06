import { clone, insert } from "./helpers"
import oldDocs from "./4.0.3"

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

export default docs
