import type { ReactElement } from 'react'
import type { GetStaticProps } from 'next'
import type { iBlogCategories, iPostExcerpt } from '../../models/blog'

import SiteSettings from '../../lib/settings'
import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import PostExcerpt from '../../components/blog/PostExcerpt'
import Pagination from '../../components/blog/Pagination'
import { getTotalPostsNumber } from '../../models/blog'
import {
  calculateTotalIndexPages,
  getIndexPosts,
  getBlogCategories,
} from '../../models/blog'
import CategoryCloud from '../../components/blog/CategoryCloud'
import Intro from '../../components/blog/SanitizedHtml'

interface index {
  (props: {
    title?: string
    indexPosts: iPostExcerpt[]
    pageNo: number
    totalPages: number
    categories: iBlogCategories
    intro?: string
    paginationPathBase?: string
  }): ReactElement<any, any>
}

const index: index = ({
  title = 'Blog',
  indexPosts,
  pageNo,
  totalPages,
  categories,
  intro,
  paginationPathBase = '/blog',
}) => (
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
  const postsPerPage = SiteSettings.POSTS_PER_PAGE
  const indexPosts = await getIndexPosts(1, postsPerPage)
  const totalPosts = await getTotalPostsNumber()
  const totalPages = calculateTotalIndexPages(totalPosts)
  const categoriesData = await getBlogCategories()

  return {
    props: {
      indexPosts: indexPosts?.data?.posts,
      pageNo: 1,
      totalPages,
      categories: categoriesData?.data?.blogCategories,
    },
    revalidate: 60,
  }
}

interface Categories {
  (props: { categories: iBlogCategories }): ReactElement<any, any>
}

const Categories: Categories = ({ categories }) => (
  <div className="hidden text-center md:block md:col-span-1">
    <h2 className="text-xl font-bold">Categories</h2>
    <CategoryCloud categories={categories} />
  </div>
)

export default index
