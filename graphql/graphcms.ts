import { gql } from '@apollo/client'

export const graphCmsIndexPostsQuery = gql`
  query IndexPosts($postsPerPage: Int!, $skip: Int!) {
    posts(
      first: $postsPerPage
      stage: PUBLISHED
      skip: $skip
      orderBy: date_DESC
    ) {
      author {
        name
        twitterHandle
        picture {
          url(
            transformation: { image: { resize: { height: 100, width: 100 } } }
          )
          height
          width
        }
      }
      excerpt
      slug
      title
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

export const graphCmsPostsTotalCountQuery = gql`
  query PostsCount {
    postsConnection(stage: PUBLISHED) {
      aggregate {
        count
      }
    }
  }
`

export const graphCmsSlugsQuery = gql`
  query Slugs {
    posts(stage: PUBLISHED, orderBy: date_DESC, first: 1000) {
      slug
    }
  }
`

export const graphCmsPostBySlugQuery = gql`
  query PostBySlug($slug: String!) {
    post(where: { slug: $slug }, stage: PUBLISHED) {
      author {
        name
        twitterHandle
        picture {
          url(
            transformation: { image: { resize: { height: 100, width: 100 } } }
          )
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

export const graphCmsBlogCategoriesQuery = gql`
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

export const graphCmsPostExcerptsByCategoryQuery = gql`
  query PostExcerptsByCategory(
    $slug: String!
    $postsPerPage: Int!
    $skip: Int!
  ) {
    blogCategory(where: { slug: $slug }) {
      name
      slug
      description {
        html
      }
      posts(orderBy: publishedAt_DESC, skip: $skip, first: $postsPerPage) {
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

export const graphCmsCategoryPostsCountQuery = gql`
  query CategoryPostsCount($slug: String!) {
    postsConnection(
      where: { categories_some: { slug: $slug } }
      stage: PUBLISHED
    ) {
      aggregate {
        count
      }
    }
  }
`
