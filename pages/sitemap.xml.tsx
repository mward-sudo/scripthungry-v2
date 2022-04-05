import type { GetServerSideProps } from 'next'
import type { CategoriesQuery, SlugsQuery } from '../generated/graphcms'
import {
  graphCmsBlogCategoriesQuery,
  graphCmsSlugsQuery,
} from '../graphql/graphcms'

import { graphCmsClient } from '../lib/apollo-client'

const Sitemap: VoidFunction = () => <></>

const baseUrl = {
  development: 'http://localhost:3000',
  test: 'http://localhost:3000',
  production: 'https://scripthungry.com',
}[process.env.NODE_ENV]

const client = graphCmsClient

const getBlogPages = async (): Promise<string[]> => {
  // Get all post slugs
  const slugsResponse = await client.query<SlugsQuery>({
    query: graphCmsSlugsQuery,
  })

  return slugsResponse.data.posts.map(
    (blogSlug) => `${baseUrl}/blog/post/${blogSlug.slug}`
  )
}

const getBlogCategoryPages = async (): Promise<string[]> => {
  // Get all blog categories
  const categoriesResponse = await client.query<CategoriesQuery>({
    query: graphCmsBlogCategoriesQuery,
  })

  return categoriesResponse.data.blogCategories.map(
    (category) => `${baseUrl}/blog/category/${category.slug}`
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pages = [
    `${baseUrl}/`,
    `${baseUrl}/blog`,
    `${baseUrl}/showcase`,
    ...(await getBlogPages()),
    ...(await getBlogCategoryPages()),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (url) => `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `
        )
        .join('')}
    </urlset>
  `

  context.res.setHeader('Content-Type', 'text/xml')
  context.res.write(sitemap)
  context.res.end()

  return {
    props: {},
  }
}

export default Sitemap
