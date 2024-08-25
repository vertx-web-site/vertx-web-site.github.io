import natural from "natural"
import { visit } from "unist-util-visit"

const { WordTokenizer, stopwords, PorterStemmer } = natural

const MAX_TERMS = 25

const remarkTermFrequency = () => (tree, file) => {
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
    if (!stopwords.includes(token)) {
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

  file.data.termFrequency = result
}

export default remarkTermFrequency
