import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx)

    return initalProps
  }

  render() {
    return (
      <Html className="min-h-full">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@400;800&amp;display=optional"
            rel="stylesheet"
          ></link>
          <meta name="theme-color" content="#641AE6"></meta>
        </Head>
        <body className="min-h-full text-base-content bg-base-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
