import { useVersion } from "../hooks/useVersion"
import Card from "@/components/Card"

const GoFurther = () => {
  const { version } = useVersion()

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <Card
        href="/introduction-to-vertx-and-reactive/"
        title="Intro"
        className="h-full"
      >
        Read our short introduction to reactive programming with Eclipse Vert.x
      </Card>
      <Card
        href={`${version !== undefined ? `/docs/${version}` : "/docs"}/vertx-core/java`}
        title="Core documentation"
        className="h-full"
      >
        The Vert.x Core documentation teaches you how to write reactive
        applications
      </Card>
      <Card href="https://how-to.vertx.io/" title="How-tos" className="h-full">
        Check out the Vert.x How-tos to get pragmatic guides for specific topics
      </Card>
    </div>
  )
}

export default GoFurther
