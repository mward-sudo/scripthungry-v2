import type { FC } from 'react'

import Link from 'next/link'

type PaginationProps = {
  pageNo: number
  totalPages: number
  path: string
}

let paginationPathBase: string
const Pagination: FC<PaginationProps> = ({ pageNo, totalPages, path }) => {
  paginationPathBase = path
  return (
    <div className="flex justify-between flex-auto w-full mb-12 text-sm md:justify-around md:text-base">
      <NewerLink pageNo={pageNo} />
      <p className="p-2 text-gray-500">
        Page {pageNo} of {totalPages}
      </p>
      <OlderLink pageNo={pageNo} totalPages={totalPages} />
    </div>
  )
}
type PaginationLinkProps = {
  pageNo: number
  totalPages?: number
}
const NewerLink: FC<PaginationLinkProps> = ({ pageNo }) =>
  pageNo > 1 ? (
    <Link href={newerPageUrl(pageNo)}>
      <a className="p-4 py-2 text-center text-white bg-blue-600 border-2 border-blue-600 rounded">
        Newer
      </a>
    </Link>
  ) : (
    <span className="p-4 py-2 text-center border-2 border-gray-500 rounded">
      No newer
    </span>
  )
const OlderLink: FC<PaginationLinkProps> = ({ pageNo, totalPages = 1 }) =>
  pageNo < totalPages ? (
    <Link href={olderPageUrl(pageNo)}>
      <a className="p-4 py-2 text-center text-white bg-blue-600 border-2 border-blue-600 rounded">
        Older
      </a>
    </Link>
  ) : (
    <span className="p-4 py-2 text-center border-2 border-gray-500 rounded">
      No older
    </span>
  )

const olderPageUrl = (pageNo: any) => `${paginationPathBase}${pageNo + 1}`

const newerPageUrl = (pageNo: any) =>
  pageNo - 1 === 1 ? paginationPathBase : `${paginationPathBase}${pageNo - 1}`

export default Pagination
