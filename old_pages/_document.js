import { Html, Head, Main, NextScript } from "next/document"

function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap" rel="stylesheet"/>
      </Head>
      <body data-build-time={process.env.buildDate} data-build-commit-id={process.env.GITHUB_SHA}
          data-build-run-id={process.env.GITHUB_RUN_ID}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument
