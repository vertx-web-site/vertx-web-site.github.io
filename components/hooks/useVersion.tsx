import { latestRelease } from "@/docs/metadata/all"
import { create } from "zustand"

interface VersionState {
  version: string
  setVersion: (version: string) => void
}

export const useVersion = create<VersionState>()(set => ({
  version: latestRelease.version,
  setVersion: version => set(_ => ({ version })),
}))
