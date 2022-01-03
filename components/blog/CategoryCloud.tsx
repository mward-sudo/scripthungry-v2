import type { FC } from 'react'
import type { iBlogCategories } from '../../models/blog'

import Link from 'next/link'

type CategoryCloudProps = {
  categories: iBlogCategories
}

const CategoryCloud: FC<CategoryCloudProps> = ({ categories }) => (
  <div className="flex flex-wrap justify-center gap-2 pt-4 text-sm">
    {categories?.map((category) => (
      <Link href={categoryLink(category.slug)} key={category.slug}>
        <a className="btn btn-sm btn-ghost">{category.name}</a>
      </Link>
    ))}
  </div>
)

const categoryLink = (slug: string) => `/blog/category/${slug}`

export default CategoryCloud
