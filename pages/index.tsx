import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
      <p className="flex flex-wrap my-16 text-3xl font-bold text-transparent gap-x-8 gap-y-6 ga">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text font-display">
          <Link href="#">
            <a>Showcase. </a>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text font-display">
          <Link href="#">
            <a>Blog. </a>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text font-display">
          <Link href="#">
            <a>GitHub. </a>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text font-display">
          <Link href="#">
            <a>LinkedIn. </a>
          </Link>
        </div>
      </p>
    </main>

    <footer>&copy; 2021 Michael Ward</footer>
  </Layout>
)

export default Home
