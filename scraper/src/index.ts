import { versions } from "../../docs/metadata/all"
import { filterLatestBugfixVersions } from "../../docs/metadata/helpers"
import Piscina from "piscina"

const piscina = new Piscina({
  filename: "./dist/worker.js",
})

async function main() {
  let filteredVersions = filterLatestBugfixVersions(versions)

  let promises: Promise<void>[] = []
  for (let version of filteredVersions) {
    promises.push(piscina.run({ version }))
  }

  await Promise.all(promises)
}

main().catch(console.error)
