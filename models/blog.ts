import { callGraphCMS } from '../lib/graphcms'
import narrowType from '../lib/narrow-type'
import SiteSettings from '../lib/settings'

export type iIndexPostsData = {
  data: {
    posts: iPostExcerpt[]
    postsConnection: {
      aggregate: {
        count: number
      }
    }
  }
}

export type iPost = iPostExcerpt & {
  author: iAuthor
  excerpt: string
  slug: string
  title: string
  coverImage: iPicture
  content: {
    html: string
  }
}

export type iPostExcerpt = {
  author: iAuthor
  excerpt: string
  slug: string
  title: string
  coverImage: iPicture
}

export type iAuthor = {
  name: string
  twitterHandle: string
  picture: iPicture
}

export type iPicture = {
  url: string
  height: number
  width: number
}

export type iPostsTotal = {
  data: {
    postsConnection: {
      aggregate: {
        count: number
      }
    }
  }
}

export type iPostSlugs = {
  data: {
    posts: {
      slug: string
    }[]
  }
}

export type iPostData = {
  data: {
    post: iPost
  }
}

export type iBlogCategories = iBlogCategory[]

export type iBlogCategoriesData = {
  data: {
    blogCategories: iBlogCategories
  }
}

export type iBlogCategory = {
  slug: string
  name: string
  description: {
    html: string
  }
}

export type iBlogCategoryWithPostExceprts = iBlogCategory & {
  posts: iPostExcerpt[]
}

export type iBlogCategoryWithPostExceprtsData = {
  data: {
    blogCategory: iBlogCategoryWithPostExceprts
  }
}

export const getIndexPosts = async (
  pageNo = 1,
  postsPerPage = 1
): Promise<iIndexPostsData> => {
  /** GraphQL query to be executed */
  const query = `
    query IndexPostsQuery {
      posts(
        first: ${postsPerPage}, 
        stage: PUBLISHED, 
        skip: ${(pageNo - 1) * postsPerPage},
        orderBy: date_DESC
      ) {
        author {
          name
          twitterHandle
          picture {
            url(transformation: {
              image: {
                resize: {
                  height: 100, width: 100}
                }
              }
            )
            height
            width
          }
        }
        excerpt
        slug
        title
        content {
          html
        }
        coverImage {
          url
          height
          width
        }
      }
      postsConnection(stage: PUBLISHED) {
        aggregate {
          count
        }
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iIndexPostsData>(response)) return response
  throw new Error('No response from CMS for IndexPostsData')
}

export const getTotalPostsNumber = async (): Promise<number> => {
  /** GraphQL query to be executed */
  const query = `
    query PostsTotalQuery {
      postsConnection(stage: PUBLISHED) {
        aggregate {
          count
        }
      }
    }
  `

  /** GraphQL JSON response */
  const response = await callGraphCMS(query)
  /** Return total or throw error if response is undefined OR null */
  if (narrowType<iPostsTotal>(response)) {
    return response?.data?.postsConnection?.aggregate?.count
  }
  throw new Error('No response from CMS for getTotalPostsNumber')
}

/**
 * Calculates the number of index pages by dividing the total number of posts by the number of
 * posts per page as set in the site settings, and rounding up to the next integer
 */
export const calculateTotalIndexPages = (totalPosts: number) =>
  Math.ceil(totalPosts / SiteSettings.POSTS_PER_PAGE)

export const getAllPostSlugs = async (): Promise<iPostSlugs> => {
  /** GraphQL query to be executed */
  const query = `
    query Slugs {
      posts(stage: PUBLISHED, orderBy: date_DESC, first: 1000) {
        slug
      }
    }    
  `

  const response = await callGraphCMS(query)

  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iPostSlugs>(response)) return response
  throw new Error('No response from CMS for getAllPostSlugs')
}

export const getPostBySlug = async (slug: string): Promise<iPostData> => {
  /** GraphQL query to be executed */
  const query = `
    query PostQuery {
      post(where: {slug: "${slug}"}, stage: PUBLISHED) {
        author {
          name
          twitterHandle
          picture {
            url(transformation: {image: {resize: {height: 100, width: 100}}})
            height
            width
          }
        }
        content {
          html
        }
        coverImage {
          url
          height
          width
        }
        date
        excerpt
        slug
        title
      }
    }  
  `

  /** GraphQL JSON response */
  const response = await callGraphCMS(query)

  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iPostData>(response)) return response
  throw new Error('No response from CMS for getPostBySlug')
}

export const getBlogCategories = async (): Promise<iBlogCategoriesData> => {
  /** GraphQL query to be executed */
  const query = `
    query Categories {
      blogCategories(orderBy: name_ASC) {
        slug
        name
        description {
          html
        }
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iBlogCategoriesData>(response)) return response
  throw new Error('No response from CMS for BlogCategories')
}

export const getBlogCategoryWithPostExcerpts = async (
  slug: string,
  postsPerPage: number,
  page = 1
): Promise<iBlogCategoryWithPostExceprtsData> => {
  const skip = postsPerPage * (page - 1)

  /** GraphQL query to be executed */
  const query = `
    query BlogCategoryWithPostExcerpts {
      blogCategory(where: {slug: "${slug}"}) {
        name
        slug
        description {
          html
        }
        posts(
          orderBy: publishedAt_DESC,
          skip: ${skip},
          first: ${postsPerPage}
        ) {
          author {
            name
            twitterHandle
            picture {
              height
              width
              url
            }
          }
          coverImage {
            url
            height
            width
          }
          excerpt
          slug
          title
        }
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iBlogCategoryWithPostExceprtsData>(response)) return response
  throw new Error('No response from CMS for BlogCategories')
}

export const getTotalBlogCategoryPosts = async (
  slug: string
): Promise<iPostsTotal> => {
  const query = `
    query MyQuery {
      postsConnection(where: {categories_some: {slug: "${slug}"}}) {
        aggregate {
          count
        }
      }
    }
  `

  const response = await callGraphCMS(query)
  /** Return response or throw error if response is undefined OR null */
  if (narrowType<iPostsTotal>(response)) return response
  throw new Error('No response from CMS for BlogCategories')
}
