import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type {
  iBlogCategories,
  iBlogCategoryWithPostExceprts,
} from '../../../../models/blog'

import {
  calculateTotalIndexPages,
  getBlogCategoryWithPostExcerpts,
  getTotalBlogCategoryPosts,
} from '../../../../models/blog'
import { getBlogCategories } from '../../../../models/blog'
import index from '../../index'
import { parsePageNumber, parseSlug } from '../../../../lib/utilities'
import SiteSettings from '../../../../lib/settings'

type categoryPageProps = {
  category: iBlogCategoryWithPostExceprts
  totalPages: number
  categories: iBlogCategories
  pageNo: number
}
const categoryPage: NextPage<categoryPageProps> = ({
  category,
  totalPages,
  categories,
  pageNo,
}) =>
  index({
    indexPosts: category?.posts,
    pageNo,
    totalPages,
    categories,
    intro: category?.description?.html,
    title: category?.name,
  })

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ? parseSlug(params.slug) : ''
  const pageNo = params?.page ? parsePageNumber(params.page) : 2
  const postsPerPage = SiteSettings.POSTS_PER_PAGE
  const totalPostsData = await getTotalBlogCategoryPosts(slug)
  const totalPosts = totalPostsData?.data?.postsConnection?.aggregate?.count

  const totalPages = calculateTotalIndexPages(totalPosts)
  const categoriesData = await getBlogCategories()

  const categoryPosts = await getBlogCategoryWithPostExcerpts(
    slug,
    postsPerPage,
    pageNo
  )

  return {
    props: {
      category: categoryPosts?.data?.blogCategory,
      totalPages,
      categories: categoriesData?.data?.blogCategories,
      pageNo,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getBlogCategories()
  const paths = await generatePathObject(categories.data.blogCategories)

  return {
    paths,
    fallback: false,
  }
}

type PathObject = {
  params: {
    slug: string
    page: string
  }
}

interface iGeneratePathObject {
  (categories: iBlogCategories): Promise<PathObject[]>
}

const generatePathObject: iGeneratePathObject = async (categories) => {
  let paths: PathObject[] = []

  for (const category of categories) {
    const totalPostsData = await getTotalBlogCategoryPosts(category.slug)
    const totalPages = totalPostsData.data.postsConnection.aggregate.count

    for (let page = 2; page <= totalPages; page++) {
      const path: PathObject = {
        params: {
          slug: category.slug,
          page: `${page}`,
        },
      }
      paths.push(path)
    }
  }

  return paths
}

export default categoryPage
