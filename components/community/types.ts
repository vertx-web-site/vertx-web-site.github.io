export interface User {
  githubId: string
  role: string
  x?: string
}

export interface Contributor {
  githubId: string
  avatar_url?: string
  contributions: number
}

export type FetchedUser = User &
  Contributor & {
    name?: string
    blog?: string
    location?: string
  }
