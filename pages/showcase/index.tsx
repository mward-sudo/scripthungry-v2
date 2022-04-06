import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Image from 'next/image'
import PageTitle from '../../components/PageTitle'
import Link from 'next/link'

const Index: NextPage = () => (
  <Layout>
    <Head>
      <title>Showcase</title>
    </Head>
    <PageTitle>Showcase</PageTitle>
    <div className="my-12">
      <Link href={'/showcase/github-stats'}>
        <a className="group">
          <div className="w-96 shadow-xl card bg-base-100">
            <figure>
              <Image
                src="/img/showcase/github.jpg"
                alt="GitHub Profile"
                width={5000}
                height={3313}
                className="block transition-all transform-gpu scale-100 group-hover:scale-110"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">GitHub Profile</h2>
              <p>
                See my GitHub user profile stats, and check yours out too.
                Demonstrates use of the GraphQL GithHub API on the server and
                client sides.
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  </Layout>
)

export default Index
