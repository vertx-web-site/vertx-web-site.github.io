export function versionFromSlug(slug: string): {
  type: "docs" | "howtos" | "guides"
  version?: string
  slug: string
} {
  let type: "docs" | "howtos" | "guides" = "docs"
  if (slug.startsWith("howtos/")) {
    type = "howtos"
    slug = slug.substring(7)
  } else if (slug.startsWith("guides/")) {
    type = "guides"
    slug = slug.substring(7)
  }
  let versionMatch = slug.match(/^(\d+\.\d+(\.\d+)?([\.-][^\/]+)?)(\/|$)/)
  if (versionMatch) {
    return {
      type,
      version: versionMatch[1],
      slug: slug.substring(versionMatch[0].length),
    }
  }
  return { type, version: undefined, slug }
}
