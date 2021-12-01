/**
 * Tests if page is a string or an array, and returns the parsedInt of page or page.pop().
 * The type for page should be string, but TypeScript definitions require that arrays are catered for
 **/
export const parsePageNumber = (page: string | string[]): number =>
  parseInt(typeof page === 'string' ? page : page[page.length - 1])

/**
 * Tests if slug is a string or an array, and returns slug or slug[0].
 * The type for slug should be string, but TypeScript definitions require that arrays are catered for
 **/
export const parseSlug = (slug: string | string[]): string =>
  typeof slug === 'string' ? slug : slug[0]
