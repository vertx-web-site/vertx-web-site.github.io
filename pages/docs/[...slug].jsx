import dynamic from "next/dynamic";
import Layout from "../../components/layouts/Page";

let asciidoctor;
let cache = {};

export async function getStaticPaths() {
  const fs = require("fs").promises;

  const extractedDocsPath = "docs/extracted";

  // check if documentation source files exist
  try {
    await fs.access(extractedDocsPath);
  } catch (e) {
    console.warn(
      "\n\n**********************************************************\n" +
          "WARNING: AsciiDoc source files of documentation not found.\n" +
          "Please run `npm run update-docs'\n" +
          "**********************************************************\n");
    return {
      paths: [],
      fallback: false
    };
  }

  // await fs.readDir(extractedDocsPath);

  console.log("STATIC PATHS");

  return {
    paths: [
      { params: { slug: ["vertx-core", "java", ""] } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  let path = params.slug.join("/");
  if (cache[path]) {
    return cache[path];
  }

  if (typeof asciidoctor === "undefined") {
    asciidoctor = require("asciidoctor")();

    // clean up any previously registered extension
    asciidoctor.Extensions.unregisterAll();

    // register highlight.js extension
    const highlightJsExt = require("asciidoctor-highlight.js");
    highlightJsExt.register(asciidoctor.Extensions);
  }

  let doc = asciidoctor.loadFile(`docs/extracted/${path}/index.adoc`, {
    safe: "unsafe",
    attributes: {
      "source-highlighter": "highlightjs-ext"
    }
  });
  let title = doc.getDocumentTitle();
  let contents = doc.convert();

  cache[path] = {
    props: {
      title,
      contents
    }
  };

  return cache[path];
}

export default ({ title, contents }) => (
  <Layout meta={{ title }}><div dangerouslySetInnerHTML={{ __html: contents }} /></Layout>
);
