import { Artifact } from "../src/artifact"
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

export interface GuidesDoc extends Doc {
  artifact: Artifact
}

export interface Docs {
  categories: Category[]
  entries: Doc[]
  prerelease?: boolean
  artifactVersion?: string
  imagesDir?: string
}

export interface GuidesDocs {
  categories: Category[]
  entries: GuidesDoc[]
}
