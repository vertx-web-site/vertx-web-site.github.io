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

insert(docs, "vertx-sql-client-templates",
     {
         id: "vertx-mssql-client",
         name: "MSSQL Client",
         description: "The Reactive MSSQL client.",
         category: "databases",
         href: "/vertx-mssql-client/java/",
         repository: "https://github.com/eclipse-vertx/vertx-sql-client",
         edit: "https://github.com/eclipse-vertx/vertx-sql-client/tree/master/vertx-mssql-client/src/main/asciidoc",
         label: "Technical Preview"
       }
 )

insert(docs, "vertx-rx-java2",
     {
         id: "vertx-rx-java3",
         name: "RxJava 3",
         description: "RxJava 3 bindings for the Vert.x APIs, modules and clients.",
         category: "reactive",
         href: "/vertx-rx/java3/",
         repository: "https://github.com/vert-x3/vertx-rx",
         edit: "https://github.com/vert-x3/vertx-rx/tree/master/rx-java3/src/main/asciidoc",
         label: "Technical Preview"
       }
)

insert(docs, "vertx-web-graphql",
     {
         id: "vertx-web-proxy",
         name: "Web Proxy",
         description: "Mounts a HTTP proxy in a web router.",
         category: "web",
         href: "/vertx-web-proxy/java/",
         repository: "https://github.com/vert-x3/vertx-web",
         edit: "https://github.com/vert-x3/vertx-web/tree/master/vertx-web-proxy/src/main/asciidoc",
         label: "Technical Preview"
       }
)

// Mark this version as a prerelease. Prereleases can be selected manually
// from the dropdown menu on the docs page but the default entry is still
// the latest GA release.
docs.prerelease = true

// force title
docs.title = "4.1.0.CR1"

export default docs
