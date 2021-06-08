import { clone } from "./helpers"
import oldDocs from "./4.0.3"
import { insert } from "./helpers"

const docs = clone(oldDocs)

insert(docs, "vertx-opentracing",
    {
        id: "vertx-opentelemetry",
        name: "OpenTelemetry",
        description: "使用 OpenTelemetry 开展分布式跟踪。",
        category: "monitoring",
        href: "/vertx-opentelemetry/java/",
        repository: "https://github.com/eclipse-vertx/vertx-tracing/tree/master/vertx-opentelemetry",
        edit: "https://github.com/vertx-china/vertx-web-site/tree/master/docs/translation/vertx-opentelemetry/java",
        label: "技术预览"
    }
)

insert(docs, "vertx-mail-client",
    {
        id: "vertx-http-proxy",
        name: "Vert.x Http 代理",
        description: "基于 Vert.x 的反向代理，旨在实现可重用的反向代理逻辑以关注更高层次的需求。",
        category: "integration",
        href: "/vertx-http-proxy/java/",
        repository: "https://github.com/eclipse-vertx/vertx-http-proxy/tree/master",
        edit: "https://github.com/vertx-china/vertx-web-site/tree/master/docs/translation/vertx-http-proxy/java",
        label: "技术预览"
    }
)

insert(docs, "vertx-sql-client-templates",
     {
         id: "vertx-mssql-client",
         name: "MSSQL 客户端",
         description: "响应式 MSSQL 客户端。",
         category: "databases",
         href: "/vertx-mssql-client/java/",
         repository: "https://github.com/eclipse-vertx/vertx-sql-client",
         edit: "https://github.com/vertx-china/vertx-web-site/tree/master/docs/translation/vertx-mssql-client/java",
         label: "技术预览"
       }
 )

insert(docs, "vertx-rx-java2",
     {
         id: "vertx-rx-java3",
         name: "RxJava 3",
         description: "用于Vert.x API，模块和客户端的 RxJava 3 绑定。",
         category: "reactive",
         href: "/vertx-rx/java3/",
         repository: "https://github.com/vert-x3/vertx-rx",
         edit: "https://github.com/vertx-china/vertx-web-site/tree/master/docs/translation/vertx-rx/java3",
         label: "技术预览"
       }
)

insert(docs, "vertx-web-graphql",
     {
         id: "vertx-web-proxy",
         name: "Web 代理",
         description: "在 Web 路由（router）中挂载 HTTP 代理。",
         category: "web",
         href: "/vertx-web-proxy/java/",
         repository: "https://github.com/vert-x3/vertx-web",
         edit: "https://github.com/vertx-china/vertx-web-site/tree/master/docs/translation/vertx-web-graphql/java",
         label: "技术预览"
       }
)

export default docs
