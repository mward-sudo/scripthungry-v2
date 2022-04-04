import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type {
  iBlogCategories,
  iBlogCategoryWithPostExceprts,
} from '../../../../models/blog'

import SiteSettings from '../../../../lib/settings'
import {
  calculateTotalIndexPages,
  getTotalBlogCategoryPosts,
} from '../../../../models/blog'
import { parseSlug } from '../../../../lib/utilities'
import {
  getBlogCategories,
  getBlogCategoryWithPostExcerpts,
} from '../../../../models/blog'
import index from '../../index'

type categoryProps = {
  category: iBlogCategoryWithPostExceprts
  totalPages: number
  categories: iBlogCategories
}
const category: NextPage<categoryProps> = ({
  category,
  totalPages,
  categories,
}) =>
  index({
    indexPosts: category?.posts,
    pageNo: 1,
    totalPages,
    categories,
    intro: category?.description?.html,
    title: category?.name,
    paginationPathBase: `/blog/category/${category?.slug}`,
  })

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ? parseSlug(params.slug) : ''
  const postsPerPage = SiteSettings.POSTS_PER_PAGE
  const totalPostsData = await getTotalBlogCategoryPosts(slug)
  const totalPosts = totalPostsData?.data?.postsConnection?.aggregate?.count

  const totalPages = calculateTotalIndexPages(totalPosts)
  const categoriesData = await getBlogCategories()

  const categoryPosts = await getBlogCategoryWithPostExcerpts(
    slug,
    postsPerPage
  )

  return {
    props: {
      category: categoryPosts?.data?.blogCategory,
      totalPages,
      categories: categoriesData?.data?.blogCategories,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const categories = await getBlogCategories()
  const slugs = categories.data.blogCategories.map((category) => category.slug)

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  }
}

export default category
