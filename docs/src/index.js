import fs from "fs/promises"
import download from "./download"
import { metadata } from "../metadata/all"
import Piscina from "piscina"
import pLimit from "p-limit"

const piscina = new Piscina({
  filename: "./src/asciidoc-worker.js"
})

async function main() {
  const limit = pLimit(4)

  let totalMessages = 0
  let asciidoctorLog = await fs.open("asciidoctor.log", "w")

  try {
    let promises = []
    for (let m of metadata) {
      promises.push(
        limit(() => download(m.version))
          .then(() => piscina.run({ version: m.version }))
          .then(messages => {
            if (messages.length > 0) {
              totalMessages += messages.length
              return asciidoctorLog.write(messages.join("\n"))
            }
          })
      )
    }
    await Promise.all(promises)
  } finally {
    await asciidoctorLog.close()
  }

  if (totalMessages > 0) {
    console.log(`There were ${totalMessages} messages from Asciidoctor. ` +
      "Please review asciidoctor.log for more information.")
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
