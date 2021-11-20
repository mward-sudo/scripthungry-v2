import Links from '../components/home/Links'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Hero from './../components/home/Hero'

const Home: NextPage = () => (
  <Layout>
    <Head>
      <title>scriptHungry</title>
      <meta
        name="description"
        content="Portfolio website by Michael Ward, Web Developer"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="mb-16">
      <Hero />
      <Links />
    </main>

    <footer>&copy; 2021 Michael Ward</footer>
  </Layout>
)

export default Home
