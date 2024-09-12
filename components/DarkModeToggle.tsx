import * as ToggleGroup from "@radix-ui/react-toggle-group"
import {
  useConfiguredTheme,
  useThemeInEffect,
  withStorageDOMEvents,
} from "./hooks/useTheme"
import { Monitor, Moon, Sun } from "@phosphor-icons/react/dist/ssr"
import { useEffect } from "react"

const DarkModeToggle = () => {
  const { themeInEffect, setThemeInEffect } = useThemeInEffect()
  const { configuredTheme, setConfiguredTheme } = useConfiguredTheme()

  useEffect(() => {
    // synchronize between tabs
    return withStorageDOMEvents(useConfiguredTheme)
  })

  useEffect(() => {
    function onQueryChange(e: MediaQueryListEvent) {
      setThemeInEffect(e.matches ? "dark" : "light")
    }

    if (configuredTheme === "system") {
      // detect automatically
      let q = window.matchMedia("(prefers-color-scheme: dark)")
      setThemeInEffect(q.matches ? "dark" : "light")

      q.addEventListener("change", onQueryChange)

      return () => {
        q.removeEventListener("change", onQueryChange)
      }
    } else {
      setThemeInEffect(configuredTheme)
    }
  }, [setThemeInEffect, configuredTheme])

  useEffect(() => {
    if (themeInEffect === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [themeInEffect])

  return (
    <ToggleGroup.Root
      className="inline-flex gap-1 rounded-l-full rounded-r-full border border-gray-200 bg-bg p-1"
      type="single"
      value={configuredTheme ?? "system"}
      onValueChange={value => {
        if (value === "system" || value === "light" || value === "dark") {
          setConfiguredTheme(value)
        }
      }}
      aria-label="Theme"
    >
      <ToggleGroup.Item
        className="flex h-7 w-7 items-center justify-center rounded-full leading-4 text-gray-600 hover:text-text focus:z-10 focus:shadow-[0_0_0_1px] focus:shadow-gray-500 focus:outline-none data-[state=on]:bg-gray-200"
        value="light"
        aria-label="Light theme"
      >
        <Sun />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="flex h-7 w-7 items-center justify-center rounded-full leading-4 text-gray-600 hover:text-text focus:z-10 focus:shadow-[0_0_0_1px] focus:shadow-gray-500 focus:outline-none data-[state=on]:bg-gray-200"
        value="system"
        aria-label="System theme"
      >
        <Monitor />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="flex h-7 w-7 items-center justify-center rounded-full leading-4 text-gray-600 hover:text-text focus:z-10 focus:shadow-[0_0_0_1px] focus:shadow-gray-500 focus:outline-none data-[state=on]:bg-gray-200"
        value="dark"
        aria-label="Dark theme"
      >
        <Moon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

export default DarkModeToggle
