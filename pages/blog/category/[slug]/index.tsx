import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type {
  CategoriesQuery,
  PostExcerptsByCategoryQuery,
  PostsCountQuery,
} from '../../../../generated/graphcms'

import SiteSettings from '../../../../lib/settings'
import { graphCmsClient } from '../../../../lib/apollo-client'
import {
  graphCmsBlogCategoriesQuery,
  graphCmsCategoryPostsCountQuery,
  graphCmsPostExcerptsByCategoryQuery,
} from '../../../../graphql/graphcms'
import { calculateTotalIndexPages } from '../../../../lib/utilities'
import { parseSlug } from '../../../../lib/utilities'
import index from '../../index'

type categoryProps = {
  category?: PostExcerptsByCategoryQuery['blogCategory']
  totalPages: number
  categories: CategoriesQuery['blogCategories']
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

const client = graphCmsClient

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get the slug from the url
  const slug = params?.slug ? parseSlug(params.slug) : ''
  // get the number of posts per page for pagination
  const postsPerPage = SiteSettings.POSTS_PER_PAGE

  const categoryPostsCountResponse = await client.query<PostsCountQuery>({
    query: graphCmsCategoryPostsCountQuery,
    variables: { slug },
  })

  const totalPages = calculateTotalIndexPages(
    categoryPostsCountResponse.data.postsConnection.aggregate.count
  )

  const categoriesResponse = await client.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })

  const categoryPostExcerptsResponse =
    await client.query<PostExcerptsByCategoryQuery>({
      query: graphCmsPostExcerptsByCategoryQuery,
      variables: {
        slug,
        postsPerPage,
        skip: 0,
      },
    })

  return {
    props: {
      category: categoryPostExcerptsResponse.data.blogCategory,
      totalPages,
      categories: categoriesResponse.data.blogCategories,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const categoriesResponse = await client.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })
  const slugs = categoriesResponse.data.blogCategories.map(
    (category) => category.slug
  )

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
