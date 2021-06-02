import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body data-build-time={process.env.buildDate} data-build-commit-id={process.env.GITHUB_SHA}
            data-build-run-id={process.env.GITHUB_RUN_ID}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
