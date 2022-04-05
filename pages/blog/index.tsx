import type { GetStaticProps } from 'next'
import type {
  CategoriesQuery,
  IndexPostsQuery,
  PostsCountQuery,
} from '../../generated/graphcms'

import SiteSettings from '../../lib/settings'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import { PostExcerpt } from '../../components/blog/PostExcerpt'
import { Pagination } from '../../components/blog/Pagination'
import { calculateTotalIndexPages } from '../../lib/utilities'
import { CategoryCloud } from '../../components/blog/CategoryCloud'
import { SanitizedHtml as Intro } from '../../components/blog/SanitizedHtml'
import { graphCmsClient } from '../../lib/apollo-client'
import {
  graphCmsBlogCategoriesQuery,
  graphCmsIndexPostsQuery,
  graphCmsPostsTotalCountQuery,
} from '../../graphql/graphcms'

type props = {
  title?: string
  indexPosts?: IndexPostsQuery['posts']
  pageNo: number
  totalPages: number
  categories: CategoriesQuery['blogCategories']
  intro?: string
  paginationPathBase?: string
}

const index = ({
  title = 'Blog',
  indexPosts,
  pageNo,
  totalPages,
  categories,
  intro,
  paginationPathBase = '/blog',
}: props) => (
  <Layout>
    <PageTitle>{title}</PageTitle>
    <div className="grid grid-cols-1 gap-x-4 md:grid-cols-4">
      <div className="col-span-1 md:col-span-3">
        {intro && <Intro html={intro} />}
        {indexPosts?.map((post) => (
          <PostExcerpt post={post} key={post.slug} />
        ))}
        <Pagination
          pageNo={pageNo}
          totalPages={totalPages}
          path={paginationPathBase}
        />
      </div>
      <Categories categories={categories} />
    </div>
  </Layout>
)

/**
 * Gets blog post excerpts for static site generation
 */
export const getStaticProps: GetStaticProps = async () => {
  // The number of posts per page for pagination
  const postsPerPage = SiteSettings.POSTS_PER_PAGE

  // Query GraphCMS for the blog categories
  const categoriesResponse = await graphCmsClient.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })

  // Query GraphCMS for the index posts
  const indexPostsResponse = await graphCmsClient.query<IndexPostsQuery>({
    query: graphCmsIndexPostsQuery,
    variables: {
      postsPerPage: postsPerPage,
      skip: 0,
    },
  })

  // Query GraphCMS for the total number of posts
  const totalPostsResponse = await graphCmsClient.query<PostsCountQuery>({
    query: graphCmsPostsTotalCountQuery,
  })

  // Calculate the total number of pages for pagination
  const totalPages = calculateTotalIndexPages(
    totalPostsResponse.data.postsConnection.aggregate.count
  )

  return {
    props: {
      indexPosts: indexPostsResponse.data.posts,
      pageNo: 1,
      totalPages,
      categories: categoriesResponse.data.blogCategories,
    },
    revalidate: 60,
  }
}

const Categories = ({
  categories,
}: {
  categories: CategoriesQuery['blogCategories']
}) => (
  <div className="hidden text-center md:block md:col-span-1">
    <h2 className="text-xl font-bold">Categories</h2>
    <CategoryCloud categories={categories} />
  </div>
)

export default index
