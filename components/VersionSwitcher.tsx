import { makeIndex, makeToc } from "./docs/Toc"
import { versionFromSlug } from "./docs/versionFromSlug"
import { useVersion } from "./hooks/useVersion"
import { latestRelease, versions } from "@/docs/metadata/all"
import { filterLatestBugfixVersions } from "@/docs/metadata/helpers"
import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components"

interface VersionSwitcherProps {
  bg: "primary" | "gray"
}

const VersionSwitcher = ({ bg }: VersionSwitcherProps) => {
  const filteredVersions = filterLatestBugfixVersions(versions)
  const { version } = useVersion()
  const pathname = usePathname()
  const router = useRouter()

  // get current version from path - this prevents the drop down from flickering
  // (i.e. briefly showing the default version after navigation before switching
  // to the actual page version)
  let type: "docs" | "howtos" | "guides" = "docs"
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
    type = vfs.type
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
      if (type === "docs" && slug !== undefined && pathVersion !== newVersion) {
        // navigate to another docs page if necessary
        let toc = makeToc(type, newVersion)
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
    [type, pathVersion, slug, router],
  )

  return (
    <>
      <Select
        selectedKey={version}
        onSelectionChange={value => onValueChange(value as string)}
        className="mb-[1px]"
        aria-label="Select a version"
      >
        <Button
          className={clsx(
            "inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-3 py-1 text-xs text-gray-700 transition-colors focus:[outline-style:none] data-[focus-visible]:outline-2 data-[focus-visible]:[outline-style:solid]",
            {
              "border border-gray-200 bg-gray-100": bg === "gray",
              "border border-primary/5 bg-primary/5 dark:bg-primary/10":
                bg === "primary",
            },
          )}
        >
          <SelectValue>
            {({ isPlaceholder }) => {
              return isPlaceholder ? (
                <>Select a version</>
              ) : (
                (pathVersion ?? version)
              )
            }}
          </SelectValue>
          <span aria-hidden="true">
            <CaretDown />
          </span>
        </Button>
        <Popover offset={5}>
          <ListBox className="z-50 rounded-sm bg-bg p-1 shadow dark:border dark:border-gray-200">
            {filteredVersions.map(v => (
              <ListBoxItem
                id={v}
                key={v}
                textValue={v}
                className="relative flex h-6 select-none items-center rounded-sm px-6 text-xs leading-none data-[focused]:bg-primary data-[focused]:text-bg data-[focused]:outline-none"
              >
                {({ isSelected }) => (
                  <>
                    {v}
                    {isSelected ? (
                      <div className="absolute left-0 inline-flex w-6 items-center justify-center">
                        <Check />
                      </div>
                    ) : undefined}
                  </>
                )}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </>
  )
}

export default VersionSwitcher
