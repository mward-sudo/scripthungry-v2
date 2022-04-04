import type { ReactElement } from 'react'

import Link from 'next/link'

interface Pagination {
  (props: { pageNo: number; totalPages: number; path: string }): ReactElement<
    any,
    any
  >
}

const Pagination: Pagination = ({ pageNo, totalPages, path }) => {
  const paginationLinks = generatePageLinksArray(pageNo, totalPages, path)

  return (
    <div className="btn-group">
      {paginationLinks.map((paginationLink) =>
        paginationLink.disabled ? (
          <button className={`btn btn-disabled`} key={paginationLink.text}>
            {paginationLink.text}
          </button>
        ) : (
          <button
            className={`btn ${paginationLink.currentPage ? 'btn-active' : ''}`}
            key={paginationLink.text}
          >
            <Link href={paginationLink.href}>
              <a>{paginationLink.text}</a>
            </Link>
          </button>
        )
      )}
    </div>
  )
}

type PaginationLink = {
  pageNo: number
  currentPage: boolean
  href: string
  text: string
  disabled: boolean
}

const generatePageLinksArray = (
  currentPage: number,
  totalPages: number,
  path: string
): PaginationLink[] => {
  const paginationLinks = []

  paginationLinks.push(prevLink(currentPage, path))

  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push({
      pageNo: i,
      currentPage: i === currentPage,
      href: i === 1 ? path : `${path}/${i}`,
      text: `${i}`,
      disabled: false,
    })
  }

  paginationLinks.push(nextLink(currentPage, totalPages, path))

  return paginationLinks
}

const prevLink = (currentPage: number, path: string): PaginationLink => {
  const prevPageNo = currentPage - 1
  return {
    pageNo: prevPageNo,
    currentPage: false,
    href: prevPageNo === 1 ? path : `${path}/${prevPageNo}`,
    text: 'Previous',
    disabled: prevPageNo < 1,
  }
}

const nextLink = (
  currentPage: number,
  totalPages: number,
  path: string
): PaginationLink => {
  const nextPageNo = currentPage + 1
  return {
    pageNo: nextPageNo,
    currentPage: false,
    href: `${path}/${nextPageNo}`,
    text: 'Next',
    disabled: nextPageNo > totalPages,
  }
}

export default Pagination
