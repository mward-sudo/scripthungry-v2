import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type {
  CategoriesQuery,
  CategoryPostsCountQuery,
  PostExcerptsByCategoryQuery,
} from '../../../../generated/graphcms'

import SiteSettings from '../../../../lib/settings'
import { calculateTotalIndexPages } from '../../../../lib/utilities'
import { range, parsePageNumber, parseSlug } from './../../../../lib/utilities'
import index from '../../index'
import { graphCmsClient } from '../../../../lib/apollo-client'
import {
  graphCmsBlogCategoriesQuery,
  graphCmsCategoryPostsCountQuery,
  graphCmsPostExcerptsByCategoryQuery,
} from '../../../../graphql/graphcms'

type categoryPageProps = {
  category: PostExcerptsByCategoryQuery['blogCategory']
  totalPages: number
  categories: CategoriesQuery['blogCategories']
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

const client = graphCmsClient

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ? parseSlug(params.slug) : ''
  const pageNo = params?.page ? parsePageNumber(params.page) : 2
  const postsPerPage = SiteSettings.POSTS_PER_PAGE
  const postsCountResponse = await client.query<CategoryPostsCountQuery>({
    query: graphCmsCategoryPostsCountQuery,
    variables: { slug },
  })
  const totalPages = calculateTotalIndexPages(
    postsCountResponse.data.postsConnection.aggregate.count
  )
  const categoriesResponse = await client.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })
  const categoryResponse = await client.query<PostExcerptsByCategoryQuery>({
    query: graphCmsPostExcerptsByCategoryQuery,
    variables: { slug, postsPerPage, skip: (pageNo - 1) * postsPerPage },
  })

  return {
    props: {
      category: categoryResponse.data.blogCategory,
      totalPages,
      categories: categoriesResponse.data.blogCategories,
      pageNo,
    },
  }
}

type PathObject = {
  params: {
    slug: string
    page: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoriesResponse = await client.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })
  const paths: PathObject[] = (
    await Promise.all(
      // Map over the categories
      categoriesResponse.data.blogCategories.map(async (category) => {
        // Calculate the total pages for pagination
        const totalPages = calculateTotalIndexPages(
          await getPostsCount(category)
        )

        // generate the paths for the category starting from page 2
        // there is no need to generate the first page as it is the same as the category page
        return range(2, totalPages).map((pageNo) => ({
          params: { slug: category.slug, page: pageNo.toString() },
        }))
      })
    )
  ).flat() // The array is nested, flatten it

  return { paths, fallback: false }
}

const getPostsCount = async (category: {
  slug: string
  name: string
  description?: { html: string } | null | undefined
}) => {
  const countResponse = await client.query<CategoryPostsCountQuery>({
    query: graphCmsCategoryPostsCountQuery,
    variables: { slug: category.slug },
  })
  return countResponse.data.postsConnection.aggregate.count
}

export default categoryPage
