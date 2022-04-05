import type { GetStaticPaths, GetStaticProps } from 'next'
import type { PostBySlugQuery, SlugsQuery } from '../../../generated/graphcms'

import { graphCmsClient } from '../../../lib/apollo-client'
import {
  graphCmsPostBySlugQuery,
  graphCmsSlugsQuery,
} from '../../../graphql/graphcms'
import Head from 'next/head'
import Layout from '../../../components/Layout'
import { Post } from '../../../components/blog/Post'

const PostPage = ({ post }: { post: PostBySlugQuery['post'] }) => (
  <Layout>
    <Head>
      <title></title>
    </Head>
    <Post post={post} />
  </Layout>
)

const client = graphCmsClient

export const getStaticPaths: GetStaticPaths = async () => {
  const slugsResponse = await client.query<SlugsQuery>({
    query: graphCmsSlugsQuery,
  })

  const paths: string[] = slugsResponse.data.posts.map(
    (post) => `/blog/post/${post.slug}`
  )

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Refactor
  const slug = params?.slug ? parseSlug(params.slug) : ''

  const postReposne = await client.query<PostBySlugQuery>({
    query: graphCmsPostBySlugQuery,
    variables: { slug },
  })

  return {
    props: {
      post: postReposne.data.post,
      slug,
    },
    revalidate: 60,
  }
}

const parseSlug = (slug: string | string[]): string =>
  typeof slug === 'string' ? slug : slug[0]

export default PostPage
