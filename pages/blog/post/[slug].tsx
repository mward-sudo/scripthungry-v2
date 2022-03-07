import type { ReactElement } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { iPostData, iPost, iPostSlugs } from '../../../models/blog'

import Head from 'next/head'
import Layout from '../../../components/Layout'
import { getAllPostSlugs } from '../../../models/blog'
import { getPostBySlug } from '../../../models/blog'
import Post from '../../../components/blog/Post'

interface PostPage {
  (props: { post: iPost }): ReactElement<any, any>
}

const PostPage: PostPage = ({ post }) => (
  <Layout>
    <Head>
      <title></title>
    </Head>
    <Post post={post} />
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs: iPostSlugs | null = await getAllPostSlugs()
  const paths: string[] =
    postSlugs !== null
      ? postSlugs?.data?.posts?.map((post) => `/blog/post/${post.slug}`)
      : ['']

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ? parseSlug(params.slug) : ''
  const postData: iPostData = await getPostBySlug(slug)

  return {
    props: {
      post: postData?.data?.post,
      slug,
    },
    revalidate: 60,
  }
}

const parseSlug = (slug: string | string[]): string =>
  typeof slug === 'string' ? slug : slug[0]

export default PostPage
