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
        </Head>
        <body className="min-h-full text-gray-800 bg-white dark:text-gray-200 dark:bg-black bg-[length:100%_400px] bg-top bg-no-repeat bg-body-light dark:bg-body-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
