import { clone, find } from "./helpers"
import oldDocs from "./4.5.1"

const docs = clone(oldDocs)

// remove old entries

// update tech previews

delete find(docs, "vertx-oracle-client").label

// new entries

export default docs
