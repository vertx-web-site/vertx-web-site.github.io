import { clone, find } from "./helpers"
import oldDocs from "./4.4.0"

const docs = clone(oldDocs)

// remove old entries

// update tech previews

delete find(docs, "vertx-mssql-client").label

// new entries

export default docs
