import { latestRelease } from "@/docs/metadata/all"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface VersionState {
  version: string
  setVersion: (version: string) => void
}

export const useVersion = create<VersionState>()(
  persist(
    set => ({
      version: latestRelease.version,
      setVersion: version => set(_ => ({ version })),
    }),
    {
      name: "vertx-version",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
