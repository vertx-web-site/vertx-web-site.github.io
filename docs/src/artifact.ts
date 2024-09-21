export interface MavenArtifact {
  type: "maven"
  name: string
  version: string
}

export interface GitHubArtifact {
  type: "github"
  owner: string
  repo: string
  ref: string
}

export type Artifact = MavenArtifact | GitHubArtifact
