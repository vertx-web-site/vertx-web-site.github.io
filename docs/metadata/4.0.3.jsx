import { clone, insert } from "./helpers"
import oldDocs from "./4.0.2"

const docs = clone(oldDocs)

insert(docs, "mutiny",
  {
    id: "vertx-mutiny-bindings",
    name: "Mutiny",
    description: "Mutiny 是一个直观的事件驱动的 Java 响应式编程库。 Vert.x 的绑定简化了纯 Vert.x 和 Quarkus 应用程序的响应式编程。",
    category: "reactive",
    href: "https://smallrye.io/smallrye-mutiny/",
    repository: "https://github.com/smallrye/smallrye-reactive-utils",
    edit: "https://github.com/smallrye/smallrye-mutiny/tree/main/documentation/src/main/jekyll"
  }
)

export default docs
