import cliProgress from "cli-progress"
import fs from "fs/promises"
import download from "./download"
import { metadata } from "../metadata/all"
import Piscina from "piscina"
import pLimit from "p-limit"
import { MessageChannel } from "worker_threads"

const piscina = new Piscina({
  filename: "./src/asciidoc-worker.js"
})

const multibar = new cliProgress.MultiBar({
  autopadding: true,
  format: function (options, params, payload) {
    if (payload.asciidoc) {
      return cliProgress.Format.Formatter({
        ...options,
        format: "{bar} {percentage}% | {value}/{total} | {message}",
        formatValue: function (v, options, type) {
          if (type === "total" || type === "value") {
            v = Math.floor(v / 100)
          }
          return cliProgress.Format.ValueFormat(v, options, type)
        }
      }, params, payload)
    } else {
      return cliProgress.Format.Formatter({
        ...options,
        format: "{bar} {percentage}% | {value} MB/{total} MB | {message}",
        formatValue: function (v, options, type) {
          if (type === "total" || type === "value") {
            return cliProgress.Format.ValueFormat(Math.round(v / 1024 / 1024), options, type)
          }
          return cliProgress.Format.ValueFormat(v, options, type)
        }
      }, params, payload)
    }
  }
}, cliProgress.Presets.rect)

async function main() {
  const limit = pLimit(4)

  let totalMessages = 0
  let asciidoctorLog = await fs.open("asciidoctor.log", "w")
  let asciidoctorBar = multibar.create(metadata.length * 100, 0, {
    message: "Compile Asciidoc", asciidoc: true })

  async function run(version) {
    let bar
    await limit(() => {
      return download(version, {
        start: (total) => {
          bar = multibar.create(total, 0, { message: version })
        },
        update: (value) => {
          bar.update(value)
        }
      })
    })
    if (bar !== undefined) {
      bar.stop()
      multibar.remove(bar)
    }

    let channel = new MessageChannel()
    channel.port2.on("message", (message) => {
      asciidoctorBar.increment(message)
    })

    let messages = await piscina.run({ version: version, progressPort: channel.port1 },
      { transferList: [channel.port1] })

    channel.port1.close()
    channel.port2.close()

    totalMessages += messages.length
    await asciidoctorLog.write(messages.join("\n"))
  }

  try {
    let promises = []
    for (let m of metadata) {
      promises.push(run(m.version))
    }
    await Promise.all(promises)
  } finally {
    await asciidoctorLog.close()
  }

  asciidoctorBar.stop()
  multibar.remove(asciidoctorBar)
  multibar.stop()

  if (totalMessages > 0) {
    console.log(`There were ${totalMessages} messages from Asciidoctor. ` +
      "Please review asciidoctor.log for more information.")
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
