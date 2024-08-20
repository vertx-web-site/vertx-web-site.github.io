export function versionFromSlug(slug: string): {
  version?: string
  slug: string
} {
  let versionMatch = slug.match(/^(\d+\.\d+(\.\d+)?(-[^\/]+)?)(\/|$)/)
  if (versionMatch) {
    return {
      version: versionMatch[1],
      slug: slug.substring(versionMatch[0].length),
    }
  }
  return { version: undefined, slug }
}
