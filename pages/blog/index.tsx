import type { GetStaticProps } from 'next'
import type { iPostExcerpt } from '../../models/blog'

import SiteSettings from '../../lib/settings'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import PostExcerpt from '../../components/blog/PostExcerpt'
import Pagination from '../../components/blog/Pagination'
import { getTotalPostsNumber } from '../../models/blog'
import { calculateTotalIndexPages, getIndexPosts } from '../../models/blog'
import { CategoryCloud } from '../../components/blog/CategoryCloud'
import Intro from '../../components/blog/SanitizedHtml'
import { graphCmsClient } from '../../lib/apollo-client'
import { graphCmsBlogCategoriesQuery } from '../../graphql/graphcms'
import type { CategoriesQuery } from '../../generated/graphcms'

type props = {
  title?: string
  indexPosts: iPostExcerpt[]
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
  const categoriesResponse = await graphCmsClient.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })

  const postsPerPage = SiteSettings.POSTS_PER_PAGE
  const indexPosts = await getIndexPosts(1, postsPerPage)
  const totalPosts = await getTotalPostsNumber()
  const totalPages = calculateTotalIndexPages(totalPosts)

  return {
    props: {
      indexPosts: indexPosts?.data?.posts,
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
