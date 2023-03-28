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

insert(docs, "vertx-auth-otp",
  {
    id: "vertx-auth-otp",
    name: "OTP Auth",
    description: "One Time Password (Multi-Factor Authentication) implementation.",
    category: "authentication-and-authorization",
    href: "/vertx-auth-otp/java/",
    repository: "https://github.com/eclipse-vertx/vertx-auth/tree/master/vertx-auth-otp",
    edit: "https://github.com/eclipse-vertx/vertx-auth/tree/master/vertx-auth-otp/src/main/asciidoc"
  }
 )

export default docs
