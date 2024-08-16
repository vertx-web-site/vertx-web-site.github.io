import { ReactNode } from "react"

export interface Category {
  id: string
  name: string
}

export interface Doc {
  id: string
  name: string
  description: ReactNode
  category: string
  href: string
  repository: string
  edit: string
  examples?: string
  label?: string
}

export interface Docs {
  categories: Category[]
  entries: Doc[]
  prerelease?: boolean
  artifactVersion?: string
}
