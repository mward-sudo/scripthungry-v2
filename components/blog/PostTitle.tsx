import OptionalLink from '../OptionalLink'

export const PostTitle = ({
  slug,
  title,
}: {
  slug?: string
  title?: string
}) => {
  let href: string | undefined
  if (slug) href = `/blog/post/${slug}`
  return (
    <h2 className="text-3xl md:text-4xl font-display">
      <OptionalLink href={href}>{title}</OptionalLink>
    </h2>
  )
}
