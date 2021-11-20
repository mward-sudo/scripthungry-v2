import '../styles/globals.css'
import type { NextComponentType } from 'next'
import Head from 'next/head'
import { AppContext, AppInitialProps, AppProps } from 'next/app'

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
