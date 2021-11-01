import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>scriptHungry</title>
        <meta
          name="description"
          content="Portfolio website by Michael Ward, Web Developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="my-16">
        <section className="flex flex-col justify-between md:flex-row">
          <div>
            <h1 className="font-bold text-transparent text-7xl bg-gradient-to-r from-blue-300 to-indigo-500 bg-clip-text font-display">
              Michael
              <br /> Ward
            </h1>
          </div>
          <div className="self-start md:self-end">
            <h2 className="text-3xl font-display">
              doing the web
              <br /> since 2002
            </h2>
          </div>
        </section>
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
}

export default Home
