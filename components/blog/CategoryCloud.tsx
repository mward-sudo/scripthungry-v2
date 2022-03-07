import type { ReactElement } from 'react'
import type { iBlogCategories } from '../../models/blog'

import Link from 'next/link'

interface CategoryCloud {
  (props: { categories: iBlogCategories }): ReactElement<any, any>
}

const CategoryCloud: CategoryCloud = ({ categories }) => (
  <div className="flex flex-wrap gap-2 justify-center pt-4 text-sm">
    {categories?.map((category) => (
      <Link href={categoryLink(category.slug)} key={category.slug}>
        <a className="btn btn-sm btn-ghost">{category.name}</a>
      </Link>
    ))}
  </div>
)

const categoryLink = (slug: string) => `/blog/category/${slug}`

export default CategoryCloud
