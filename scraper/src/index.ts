import fs from "fs/promises"

async function main() {
  await fs.mkdir("../public/docs", { recursive: true })
  await fs.writeFile("../public/docs/index.json", "")
}

main().catch(console.error)
