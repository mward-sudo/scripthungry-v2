import type { FC } from 'react'
import type { GetStaticProps } from 'next'
import type { iIndexPostsData } from '../../models/blog'

import SiteSettings from '../../lib/settings'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import PostExcerpt from '../../components/blog/PostExcerpt'
import Pagination from '../../components/blog/Pagination'
import { calculateTotalIndexPages, getIndexPosts } from '../../models/blog'

type indexProps = {
  indexPosts: iIndexPostsData
  pageNo: number
  totalPages: number
}

const index: FC<indexProps> = ({
  indexPosts: {
    data: { posts, postsConnection: connection },
  },
  pageNo,
  totalPages,
}) => (
  /** Destructures props.indexPosts.data.posts and props.indexPosts.data.postsConnection,
   *  aliased as connection */
  <Layout>
    <PageTitle>Blog</PageTitle>
    {posts.map((post) => (
      <PostExcerpt post={post} key={post.slug} />
    ))}
    <Pagination pageNo={pageNo} totalPages={totalPages} path="/blog/" />
  </Layout>
)

/**
 * Gets blog post excerpts for static site generation
 */
export const getStaticProps: GetStaticProps = async () => {
  const postsPerPage = SiteSettings.POSTS_PER_PAGE
  const indexPosts = await getIndexPosts(1, postsPerPage)
  const totalPages = await calculateTotalIndexPages()

  return {
    props: {
      indexPosts,
      pageNo: 1,
      totalPages,
    },
    revalidate: 60,
  }
}

export default index
