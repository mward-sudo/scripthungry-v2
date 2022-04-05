import SiteSettings from '../lib/settings'

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

// Return true if every element of array is not null
export const allNotNull = <T>(array: T[]): boolean =>
  array.every((element) => element !== null)

/**
 * Returns an array of numbers from start to end, inclusive.
 *
 * @param start The first element of the array
 * @param end The last element of the array
 * @returns Array of numbers from start to end
 */
export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start)

/**
 * Calculates the number of index pages by dividing the total number of posts by the number of
 * posts per page as set in the site settings, and rounding up to the next integer
 */
export const calculateTotalIndexPages = (totalPosts: number) =>
  Math.ceil(totalPosts / SiteSettings.POSTS_PER_PAGE)
