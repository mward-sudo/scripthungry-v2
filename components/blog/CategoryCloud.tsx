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
        <a className="p-2 px-4 bg-blue-500 bg-opacity-25 border-2 border-white border-opacity-25 rounded">
          {category.name}
        </a>
      </Link>
    ))}
  </div>
)

const categoryLink = (slug: string) => `/blog/category/${slug}`

export default CategoryCloud
