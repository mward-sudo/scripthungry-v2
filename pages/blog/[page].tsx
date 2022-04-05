import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type {
  CategoriesQuery,
  IndexPostsQuery,
  PostsCountQuery,
} from '../../generated/graphcms'

import SiteSettings from '../../lib/settings'
import index from './index'
import { calculateTotalIndexPages } from '../../lib/utilities'
import { parsePageNumber, range } from '../../lib/utilities'
import { graphCmsClient } from '../../lib/apollo-client'
import {
  graphCmsBlogCategoriesQuery,
  graphCmsIndexPostsQuery,
  graphCmsPostsTotalCountQuery,
} from '../../graphql/graphcms'

type indexProps = {
  indexPosts: IndexPostsQuery['posts']
  pageNo: number
  totalPages: number
  categories: CategoriesQuery['blogCategories']
}

/** Uses index.tsx to render. DRY */
const indexPagination: NextPage<indexProps> = ({
  indexPosts,
  pageNo,
  totalPages,
  categories,
}) => index({ indexPosts, pageNo, totalPages, categories })

const client = graphCmsClient

/** Paths for static site generation */
export const getStaticPaths: GetStaticPaths = async () => {
  const postsCount = await client.query<PostsCountQuery>({
    query: graphCmsPostsTotalCountQuery,
  })

  const totalPages = calculateTotalIndexPages(
    postsCount.data.postsConnection.aggregate.count
  )
  const paths = range(2, totalPages).map((pageNo) => ({
    params: { page: pageNo.toString() },
  }))

  return {
    paths,
    fallback: false, // return 404 for invalid pages
  }
}

/**
 * Gets blog post excerpts for static site generation
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Using optional chaining, defaults to 2 if params or params.page is undefined
  const pageNo = params?.page ? parsePageNumber(params.page) : 2
  const postsPerPage = SiteSettings.POSTS_PER_PAGE

  // get the total number of posts
  const postsCountResponse = await client.query<PostsCountQuery>({
    query: graphCmsPostsTotalCountQuery,
  })

  const totalPages = calculateTotalIndexPages(
    postsCountResponse.data.postsConnection.aggregate.count
  )

  // get the posts for this page
  const indexPostsResponse = await client.query<IndexPostsQuery>({
    query: graphCmsIndexPostsQuery,
    variables: { postsPerPage, skip: (pageNo - 1) * postsPerPage },
  })

  // get all categories
  const categoriesResponse = await client.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })

  return {
    props: {
      indexPosts: indexPostsResponse.data.posts,
      pageNo,
      totalPages,
      categories: categoriesResponse.data.blogCategories,
    },
    revalidate: 60,
  }
}

export default indexPagination
