import {
  Block,
  SyntaxHighlighterFunctions,
  SyntaxHighlighterHighlightOptions,
} from "asciidoctor"
import JSON5 from "json5"
import fs from "node:fs/promises"
import {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  LanguageRegistration,
  createHighlighter as createShikiHighlighter,
} from "shiki"

let SHIKI: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined =
  undefined
let THEME: string | undefined = undefined

export async function createHighlighter(): Promise<SyntaxHighlighterFunctions> {
  const steepColorTheme = JSON5.parse(
    await fs.readFile("../components/lib/steep-color-theme.json", "utf8"),
  )

  if (SHIKI === undefined) {
    SHIKI = await createShikiHighlighter({
      themes: [steepColorTheme],
      langs: ["java"],
    })
    THEME = steepColorTheme.name
  }

  let h: SyntaxHighlighterFunctions = {
    highlight(
      _node: Block,
      source: string,
      lang: string | undefined,
      _opts: SyntaxHighlighterHighlightOptions,
    ): any {
      if (lang === undefined) {
        return source
      }

      let shiki = SHIKI!
      let llc = lang.toLocaleLowerCase()
      if (
        llc !== "text" &&
        llc !== "txt" &&
        llc !== "plain" &&
        !shiki.getLoadedLanguages().includes(llc)
      ) {
        // TODO not all aliases are handled here
        let lr: LanguageRegistration = require(
          `shiki/dist/langs/${llc}.mjs`,
        ).default
        shiki.loadLanguageSync(lr)
      }
      let r = shiki.codeToHtml(source, {
        lang: llc.toLocaleLowerCase(),
        theme: THEME!,
      })

      // strip off <pre> and <code> because AsciiDoctor already includes those
      r = r
        .replace(/^\s*<pre[^>]*>\s*<code[^>]*>/, "")
        .replace(/<\/code>\s*<\/pre>$/, "")

      return r
    },

    handlesHighlighting(): boolean {
      return true
    },
  }

  return h
}
