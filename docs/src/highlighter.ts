import {
  Block,
  SyntaxHighlighterFunctions,
  SyntaxHighlighterHighlightOptions,
} from "asciidoctor"
import JSON5 from "json5"
import fs from "node:fs/promises"
import {
  bundledLanguages,
  createHighlighter as createShikiHighlighter,
} from "shiki"

export async function createHighlighter(): Promise<SyntaxHighlighterFunctions> {
  const steepColorTheme = JSON5.parse(
    await fs.readFile("../components/lib/steep-color-theme.json", "utf8"),
  )

  let shiki = await createShikiHighlighter({
    themes: [steepColorTheme],
    langs: Object.keys(bundledLanguages),
  })
  let theme = steepColorTheme.name
  let languages = new Set(shiki.getLoadedLanguages())
  languages.add("ansi")
  languages.add("plain")
  languages.add("text")
  languages.add("txt")

  let h: SyntaxHighlighterFunctions = {
    highlight(
      _node: Block,
      source: string,
      lang: string | undefined,
      _opts: SyntaxHighlighterHighlightOptions,
    ): any {
      if (lang === undefined || !languages.has(lang.toLocaleLowerCase())) {
        return source
      }

      let r = shiki.codeToHtml(source, {
        lang: lang.toLocaleLowerCase(),
        theme,
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
