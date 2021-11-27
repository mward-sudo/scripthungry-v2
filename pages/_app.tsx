import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import type { NextComponentType } from 'next'

import '../styles/globals.css'
import Head from 'next/head'

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
