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

insert(docs, "vertx-sql-client-templates",
    {
        id: "vertx-mssql-client",
        name: "MSSQL Client",
        description: "The Reactive MSSQL client.",
        category: "databases",
        href: "/vertx-mssql-client/java/",
        repository: "https://github.com/eclipse-vertx/vertx-sql-client",
        edit: "https://github.com/eclipse-vertx/vertx-sql-client/tree/master/vertx-mssql-client/src/main/asciidoc",
        examples: "https://github.com/vert-x3/vertx-examples/tree/3.x/reactive-sql-client-examples",
        label: "Technical Preview"
      }
)

export default docs
