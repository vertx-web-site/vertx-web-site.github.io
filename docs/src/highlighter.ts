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
  bundledLanguages,
  createHighlighter as createShikiHighlighter,
} from "shiki"

let SHIKI: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined =
  undefined
let THEME: string | undefined = undefined
let LANGUAGES: Set<string> | undefined = undefined

export async function createHighlighter(): Promise<SyntaxHighlighterFunctions> {
  const steepColorTheme = JSON5.parse(
    await fs.readFile("../components/lib/steep-color-theme.json", "utf8"),
  )

  if (SHIKI === undefined) {
    SHIKI = await createShikiHighlighter({
      themes: [steepColorTheme],
      langs: Object.keys(bundledLanguages),
    })
    THEME = steepColorTheme.name
    LANGUAGES = new Set(SHIKI.getLoadedLanguages())
    LANGUAGES.add("ansi")
    LANGUAGES.add("plain")
    LANGUAGES.add("text")
    LANGUAGES.add("txt")
  }

  let h: SyntaxHighlighterFunctions = {
    highlight(
      _node: Block,
      source: string,
      lang: string | undefined,
      _opts: SyntaxHighlighterHighlightOptions,
    ): any {
      if (lang === undefined || !LANGUAGES!.has(lang.toLocaleLowerCase())) {
        return source
      }

      let r = SHIKI!.codeToHtml(source, {
        lang: lang.toLocaleLowerCase(),
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
