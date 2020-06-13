const { WordTokenizer, stopwords, PorterStemmer } = require("natural")
const visit = require("unist-util-visit")

const MAX_TERMS = 25

// finds the top MAX_TERMS terms and exports them as __tfidf__terms from the MDX file
module.exports = () => tree => {
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
  let result = []
  for (let term of Object.keys(terms)) {
    let tf = terms[term]
    result.push({ term, tf })
  }

  // sort array by term frequency and get top MAX_TERMS terms
  result.sort((a, b) => b.tf - a.tf)
  result = result.slice(0, MAX_TERMS)

  // export terms from MDX file so we can use them later to calculate related posts
  tree.children.push({
    type: "export",
    value: "export const __tfidf__terms = " + JSON.stringify(result)
  })
}
