import { clone } from "./helpers"
import oldDocs from "./4.1.0"
import { insert } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-mssql-client",
     {
         id: "vertx-oracle-client",
         name: "Oracle Client",
         description: "The Reactive Oracle client.",
         category: "databases",
         href: "/vertx-oracle-client/java/",
         repository: "https://github.com/eclipse-vertx/vertx-sql-client",
         edit: "https://github.com/eclipse-vertx/vertx-sql-client/tree/master/vertx-oracle-client/src/main/asciidoc",
         label: "Technical Preview"
       }
 )

// Mark this version as a prerelease. Prereleases can be selected manually
// from the dropdown menu on the docs page but the default entry is still
// the latest GA release.
docs.prerelease = true

// force title
docs.title = "4.2.0.CR1"

export default docs
