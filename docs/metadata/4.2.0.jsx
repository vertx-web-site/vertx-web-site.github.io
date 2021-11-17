import { clone } from "./helpers"
import oldDocs from "./4.1.0"
import { insert } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-mssql-client",
  {
    id: "vertx-oracle-client",
    name: "Oracle Client",
    description: "响应式的 Oracle 数据库客户端。",
    category: "databases",
    href: "/vertx-oracle-client/java/",
    repository: "https://github.com/eclipse-vertx/vertx-sql-client",
    edit: "https://github.com/eclipse-vertx/vertx-sql-client/tree/master/vertx-oracle-client/src/main/asciidoc",
    label: "Technical Preview"
  }
)

insert(docs, "vertx-auth-webauthn",
  {
    id: "vertx-auth-otp",
    name: "OTP Auth",
    description: "一次性密码 (多重因子身份验证) 的实现。",
    category: "authentication-and-authorization",
    href: "/vertx-auth-otp/java/",
    repository: "https://github.com/vert-x3/vertx-auth/tree/master/vertx-auth-otp",
    edit: "https://github.com/vert-x3/vertx-auth/tree/master/vertx-auth-otp/src/main/asciidoc"
  }
)

export default docs
