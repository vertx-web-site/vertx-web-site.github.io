import Card from "@/components/Card"
import SimpleIcon from "@/components/SimpleIcon"
import { Book, SlidersHorizontal } from "@phosphor-icons/react/dist/ssr"
import { Metadata } from "next"
import { siDiscord, siGooglemessages, siStackoverflow } from "simple-icons"

export const metadata: Metadata = {
  title: "Resources",
}

const Resources = () => {
  return (
    <main className="prose">
      <h1>Resources</h1>

      <h2 id="channels">Channels</h2>
      <p>
        We have a thriving user and developer community and many exciting new
        developments to come, so why not be a part of it?
      </p>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Card
          title={
            <div className="flex flex-row items-center gap-2">
              <SimpleIcon icon={siGooglemessages} className="mb-0.5" />
              <div>User Group</div>
            </div>
          }
          href="https://groups.google.com/g/vertx"
          className="h-full min-h-40"
        >
          A Google group for users. Post a message if you need help or to report
          problems.
        </Card>
        <Card
          title={
            <div className="flex flex-row items-center gap-2">
              <SimpleIcon icon={siStackoverflow} className="mb-0.5" />
              <div>Stack Overflow</div>
            </div>
          }
          href="https://stackoverflow.com/questions/tagged/vert.x"
          className="h-full min-h-40"
        >
          Mark your questions with the `vert.x` tag. We do our best to answer
          questions there but keeping up with the User Group is our priority.
        </Card>
        <Card
          title={
            <div className="flex flex-row items-center gap-2">
              <SimpleIcon icon={siDiscord} className="mb-0.5" />
              <div>Discord</div>
            </div>
          }
          href="https://discord.gg/6ry7aqPWXy"
          className="h-full min-h-40"
        >
          Come and chat with other users.
        </Card>
        <Card
          title={
            <div className="flex flex-row items-center gap-2">
              <SimpleIcon icon={siGooglemessages} className="mb-0.5" />
              <div>Developer Group</div>
            </div>
          }
          href="https://groups.google.com/g/vertx-dev"
          className="h-full min-h-40"
        >
          A Google group for Vert.x core developers and contributors.
        </Card>
      </div>

      <h2 id="external-material">External material</h2>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Card
          title={
            <div className="flex flex-row items-center gap-2">
              <Book className="mb-0.5" />
              <div>How Tos</div>
            </div>
          }
          href="https://how-to.vertx.io/"
          className="h-full min-h-40"
        >
          Check out the Vert.x How-tos to get pragmatic guides for specific
          topics.
        </Card>
        <Card
          title={
            <div className="flex flex-row items-center gap-2">
              <SlidersHorizontal className="mb-0.5" />
              <div>EventBus Bridge Clients</div>
            </div>
          }
          href="https://github.com/vert-x3/vertx-eventbus-bridge-clients"
          className="h-full min-h-40"
        >
          Connect to the Vert.x event bus from various programming languages
          (Java, C#, C, Go, JavaScript, Python, etc.)
        </Card>
      </div>
    </main>
  )
}

export default Resources
