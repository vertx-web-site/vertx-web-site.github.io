// similar to the "shell" language but only highlights lines that start
// with a $ character
function betterShell() {
  return {
    aliases: ["console"],
    contains: [
      {
        className: "meta",
        begin: "^\\s{0,3}[/\\w\\d\\[\\]()@-]*[$]",
        starts: {
          end: "$", subLanguage: "bash"
        }
      }
    ]
  }
}

export default betterShell
