import type { FC } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { iIndexPostsData } from '../../models/blog'

import SiteSettings from '../../lib/settings'
import { getIndexPosts } from '../../models/blog'
import { calculateTotalIndexPages } from '../../models/blog'
import index from './index'

type indexProps = {
  indexPosts: iIndexPostsData
  pageNo: number
  totalPages: number
}

/** Uses index.tsx to render. DRY */
const indexPagination: FC<indexProps> = ({ indexPosts, pageNo, totalPages }) =>
  index({ indexPosts, pageNo, totalPages })

/** Paths for static site generation */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: generatePathsObject(await calculateTotalIndexPages()),
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
  const totalPages = await calculateTotalIndexPages()
  const indexPosts = await getIndexPosts(pageNo, postsPerPage)

  return {
    props: {
      indexPosts,
      pageNo,
      totalPages,
    },
    revalidate: 60,
  }
}

/**
 * Generates paths for index pages from 2 through to totalPages
 * Each array element returned contains a params.page property with page number
 * as a string
 */
const generatePathsObject = (
  totalPages: number
): { params: { page: string } }[] => {
  let paths = []
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: `${page}` } })
  }
  return paths
}

/**
 * Tests if page is a string or an array, and returns the parsedInt of page or page[0].
 * The type for page should be string, but TypeScript definitions require that arrays are catered for
 **/
const parsePageNumber = (page: string | string[]): number =>
  parseInt(typeof page === 'string' ? page : page[0])

export default indexPagination
