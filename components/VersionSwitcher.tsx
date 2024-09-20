import * as Select from "@radix-ui/react-select"
import { makeIndex, makeToc } from "./docs/Toc"
import { versionFromSlug } from "./docs/versionFromSlug"
import { useVersion } from "./hooks/useVersion"
import { latestRelease, versions } from "@/docs/metadata/all"
import { filterLatestBugfixVersions } from "@/docs/metadata/helpers"
import { CaretDown, CaretUp, Check } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"
import { forwardRef, useCallback } from "react"

interface VersionSwitcherProps {
  bg: "primary" | "gray"
}

interface SelectItemProps {
  className?: string
  children: React.ReactNode
  value: string
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value }, forwardedRef) => {
    return (
      <Select.Item
        className={clsx(
          "relative flex h-6 select-none items-center rounded-sm px-6 text-xs leading-none data-[highlighted]:bg-primary data-[highlighted]:text-bg data-[highlighted]:outline-none",
          className,
        )}
        value={value}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
          <Check />
        </Select.ItemIndicator>
      </Select.Item>
    )
  },
)

const VersionSwitcher = ({ bg }: VersionSwitcherProps) => {
  const filteredVersions = filterLatestBugfixVersions(versions)
  const { setVersion, version } = useVersion()
  const pathname = usePathname()
  const router = useRouter()

  // get current version from path - this prevents the drop down from flickering
  // (i.e. briefly showing the default version after navigation before switching
  // to the actual page version)
  let isGuides = false
  let pathVersion: string | undefined = undefined
  let slug: string | undefined = undefined
  if (pathname.startsWith("/docs")) {
    let pn = pathname.substring(5)
    if (pn.startsWith("/")) {
      pn = pn.substring(1)
    }
    if (pn.endsWith("/")) {
      pn = pn.substring(0, pn.length - 1)
    }

    let vfs = versionFromSlug(pn)
    isGuides = vfs.isGuides
    pathVersion = vfs.version
    slug = vfs.slug
  }

  let onValueChange = useCallback(
    (newVersion: string) => {
      let nv = newVersion
      if (newVersion === latestRelease.version) {
        nv = ""
      }

      let p: string[]
      if (slug !== undefined && pathVersion !== newVersion) {
        // navigate to another docs page if necessary
        let toc = makeToc(isGuides, newVersion)
        let index = makeIndex(toc)
        if (index[slug] !== undefined) {
          p = ["/docs", nv, slug]
        } else {
          p = ["/docs", nv]
        }
      } else {
        // navigate to docs index
        p = ["/docs", nv]
      }

      router.push(p.filter(s => s !== "").join("/"))
    },
    [isGuides, pathVersion, slug, router],
  )

  return (
    <Select.Root value={version} onValueChange={onValueChange}>
      <Select.Trigger
        className={clsx(
          "inline-flex select-none flex-row items-center gap-1 whitespace-nowrap rounded-sm px-3 py-1 text-xs text-gray-700 transition-colors",
          {
            "border border-gray-200 bg-gray-100": bg === "gray",
            "border border-primary/5 bg-primary/5 dark:bg-primary/10":
              bg === "primary",
          },
        )}
      >
        <Select.Value
          placeholder="Select a version"
          aria-label={pathVersion ?? version}
        >
          {pathVersion ?? version}
        </Select.Value>
        <Select.Icon>
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          onCloseAutoFocus={e => e.preventDefault()}
          position="popper"
          sideOffset={5}
          className="z-50 overflow-hidden rounded-sm bg-bg shadow dark:border dark:border-gray-200"
        >
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-bg text-sm text-text">
            <CaretUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {filteredVersions.map(v => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-bg text-sm text-text">
            <CaretDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default VersionSwitcher
