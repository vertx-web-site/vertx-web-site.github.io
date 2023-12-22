import { clone, find } from "./helpers"
import oldDocs from "./4.5.1"

const docs = clone(oldDocs)

// remove old entries

// update tech previews

delete find(docs, "vertx-oracle-client").label
delete find(docs, "vertx-uri-template").label
delete find(docs, "vertx-opentelemetry").label

// new entries

export default docs
