import Link from 'next/link'
import type { CategoriesQuery } from '../../generated/graphcms'

export const CategoryCloud = ({
  categories,
}: {
  categories: CategoriesQuery['blogCategories']
}) => (
  <div className="flex flex-wrap gap-2 justify-center pt-4 text-sm">
    {categories.map((category) => (
      <Link href={categoryLink(category.slug)} key={category.slug}>
        <a className="btn btn-sm btn-ghost">{category.name}</a>
      </Link>
    ))}
  </div>
)

const categoryLink = (slug: string) => `/blog/category/${slug}`
