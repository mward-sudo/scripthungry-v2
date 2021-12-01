import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import type { iBlogCategories, iPostExcerpt } from '../../models/blog'

import { getTotalPostsNumber } from '../../models/blog'
import { getIndexPosts, getBlogCategories } from '../../models/blog'
import { calculateTotalIndexPages } from '../../models/blog'
import { parsePageNumber } from '../../lib/utilities'
import SiteSettings from '../../lib/settings'
import index from './index'

type indexProps = {
  indexPosts: iPostExcerpt[]
  pageNo: number
  totalPages: number
  categories: iBlogCategories
}

/** Uses index.tsx to render. DRY */
const indexPagination: NextPage<indexProps> = ({
  indexPosts,
  pageNo,
  totalPages,
  categories,
}) => index({ indexPosts, pageNo, totalPages, categories })

/** Paths for static site generation */
export const getStaticPaths: GetStaticPaths = async () => {
  const totalPosts = await getTotalPostsNumber()
  const totalPages = await calculateTotalIndexPages(totalPosts)
  const paths = generatePathsObject(totalPages)

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
  const totalPosts = await getTotalPostsNumber()
  const totalPages = await calculateTotalIndexPages(totalPosts)
  const indexPosts = await getIndexPosts(pageNo, postsPerPage)
  const categoriesData = await getBlogCategories()

  return {
    props: {
      indexPosts: indexPosts.data.posts,
      pageNo,
      totalPages,
      categories: categoriesData.data.blogCategories,
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

export default indexPagination
