const { WordTokenizer, stopwords, PorterStemmer } = require("natural")
const visit = require("unist-util-visit")

const MAX_TERMS = 25

class TermFrequency {
  apply() {
    let that = this

    return () => tree => {
      // collect pure text from tree
      let text = ""
      visit(tree, "text", node => {
        text += node.value + " "
      })

      // tokenize text
      let tokenizer = new WordTokenizer()
      let tokens = tokenizer.tokenize(text.toLowerCase())

      // count words
      let terms = {}
      for (let token of tokens) {
        if (stopwords.indexOf(token) < 0 && token !== "vert" && token !== "vertx" && token !== "eclipse") {
          token = PorterStemmer.stem(token)
          if (terms[token] !== undefined) {
            terms[token]++
          } else {
            terms[token] = 1
          }
        }
      }

      // convert terms to array
      that.result = []
      for (let term of Object.keys(terms)) {
        let tf = terms[term]
        that.result.push({ term, tf })
      }

      // sort array by term frequency and get top MAX_TERMS terms
      that.result.sort((a, b) => b.tf - a.tf)
      that.result = that.result.slice(0, MAX_TERMS)
    }
  }
}

module.exports = TermFrequency
