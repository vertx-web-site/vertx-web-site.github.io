import { Mutate, StoreApi, UseBoundStore, create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark"
export type ConfiguredTheme = Theme | "system"

type StoreWithPersist = Mutate<
  StoreApi<ConfiguredThemeState>,
  [["zustand/persist", ConfiguredThemeState]]
>

// synchronize between tabs
export const withStorageDOMEvents = (
  store: UseBoundStore<StoreWithPersist>,
) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name) {
      store.persist.rehydrate()
    }
  }

  window.addEventListener("storage", storageEventCallback)

  return () => {
    window.removeEventListener("storage", storageEventCallback)
  }
}

interface ConfiguredThemeState {
  configuredTheme: ConfiguredTheme
  setConfiguredTheme: (configuredTheme: ConfiguredTheme) => void
}

export const useConfiguredTheme = create<ConfiguredThemeState>()(
  persist(
    set => ({
      configuredTheme: "system",
      setConfiguredTheme: configuredTheme => set(_ => ({ configuredTheme })),
    }),
    { name: "vertx-theme" },
  ),
)

interface ThemeInEffectState {
  themeInEffect: Theme | undefined
  setThemeInEffect: (theme: Theme) => void
}

export const useThemeInEffect = create<ThemeInEffectState>()(set => ({
  themeInEffect: undefined,
  setThemeInEffect: themeInEffect => set(_ => ({ themeInEffect })),
}))
