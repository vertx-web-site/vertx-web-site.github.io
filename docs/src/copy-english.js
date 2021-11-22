import { metadata, latestRelease } from "../metadata/all"
import fs from "fs/promises"
import fsSync from "fs"
import { extractedPath } from "./extract"
import path from "path"

async function copy(src, dest) {
    let stat = await fs.stat(src)
    if (stat.isDirectory()) {
        let files = await fs.readdir(src)
        for (let i of files) {
            if (i === "enums.adoc") {
                continue
            }
            await copy(path.join(src, i), path.join(dest, i))
        }
    } else {
        if (src.endsWith(".adoc")) {
            await fs.mkdir(path.dirname(dest), { recursive: true })
            await fs.copyFile(src, dest)
        }
    }
}

async function main() {
    let p = path.join(extractedPath, latestRelease.version)
    await copy(p, path.join("./translation"))
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
