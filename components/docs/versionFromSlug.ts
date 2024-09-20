export function versionFromSlug(slug: string): {
  isGuides: boolean
  version?: string
  slug: string
} {
  let isGuides = false
  if (slug.startsWith("guides/")) {
    isGuides = true
    slug = slug.substring(7)
  }
  let versionMatch = slug.match(/^(\d+\.\d+(\.\d+)?(-[^\/]+)?)(\/|$)/)
  if (versionMatch) {
    return {
      isGuides,
      version: versionMatch[1],
      slug: slug.substring(versionMatch[0].length),
    }
  }
  return { isGuides, version: undefined, slug }
}
