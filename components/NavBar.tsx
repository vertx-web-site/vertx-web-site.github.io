"use client"

import Link from "./LinkFix"
import ScrollTopWorkaround from "./ScrollTopWorkaround"
import SimpleIcon from "./SimpleIcon"
import { Tooltip } from "./Tooltip"
import QuickSearch from "./search/QuickSearch"
import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import { Spin as Hamburger } from "hamburger-react"
import { throttle } from "lodash"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  siAwesomelists,
  siDiscord,
  siGithub,
  siGooglemessages,
  siStackoverflow,
  siYoutube,
} from "simple-icons"

const DialogRoot = dynamic(
  () => import("@radix-ui/react-dialog").then(mod => mod.Root),
  { ssr: false },
)
const DialogPortal = dynamic(
  () => import("@radix-ui/react-dialog").then(mod => mod.Portal),
  { ssr: false },
)
const DialogContent = dynamic(
  () => import("@radix-ui/react-dialog").then(mod => mod.Content),
  { ssr: false },
)
const RemoveScroll = dynamic(
  () => import("react-remove-scroll").then(mod => mod.RemoveScroll),
  {
    ssr: false,
  },
)

interface ResizeObserverProps {
  onResize: () => void
}

const ResizeObserver = ({ onResize }: ResizeObserverProps) => {
  useEffect(() => {
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [onResize])
  return <></>
}

interface LogoProps {
  onClick?: () => void
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 text-xl text-black text-opacity-90 dark:text-white"
      onClick={() => onClick?.()}
    >
      <img
        src={require("../assets/logo.svg")}
        className="h-8 w-fit dark:hidden"
        width={1706.4}
        height={532.9}
        alt="Logo"
      />
      <img
        src={require("../assets/logo.svg")}
        className="hidden h-8 w-fit dark:block"
        width={1706.4}
        height={532.9}
        alt="Logo"
      />
    </Link>
  )
}

interface NavBarProps {
  fixed?: boolean
  narrow?: boolean
}

const NavBar = ({ fixed = true, narrow = false }: NavBarProps) => {
  const lastScrollY = useRef(-1)
  const [belowThreshold, setBelowThreshold] = useState(true)
  const [needsTransition, setNeedsTransition] = useState(false)
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [onTop, setOnTop] = useState(true)
  // TODO
  // const { theme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() {
      let diff = window.scrollY - lastScrollY.current

      if (window.scrollY > 100) {
        if (diff <= -15) {
          lastScrollY.current = window.scrollY
          setVisible(true)
        } else if (diff >= 15) {
          lastScrollY.current = window.scrollY
          setVisible(false)
        }
        setBelowThreshold(false)
      } else if (window.scrollY > 80) {
        if (diff <= -15) {
          lastScrollY.current = window.scrollY
          setVisible(true)
        }
      } else if (window.scrollY === 0) {
        lastScrollY.current = window.scrollY
        setVisible(false)
        setBelowThreshold(true)
      }

      setOnTop(window.scrollY < 5)
    }

    if (lastScrollY.current === -1) {
      lastScrollY.current = window.scrollY
    }

    onScroll()

    const throttledOnScroll = throttle(onScroll, 100)

    window.addEventListener("scroll", throttledOnScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledOnScroll)
    }
  }, [])

  useEffect(() => {
    // delay transition a little bit to prevent flickering
    setTimeout(() => {
      setNeedsTransition(!belowThreshold)
    }, 100)
  }, [belowThreshold])

  useEffect(() => {
    // close menu when navigating
    setCollapsed(false)
  }, [pathname])

  const links = [
    {
      href: "/showcase/",
      label: "Start",
    },
    {
      href: "/docs/",
      label: "Docs",
    },
    {
      href: "/about/",
      label: "Resources",
    },
    {
      href: "/blog/",
      label: "Blog",
    },
    {
      href: "/community/",
      label: "Community",
    },
  ]

  const socialIcons = [
    {
      title: "Awesome Vert.x",
      content: (
        <Link
          href="https://github.com/vert-x3/vertx-awesome"
          className="group"
          aria-label="Awesome Vert.x"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleIcon
            icon={siAwesomelists}
            size="1em"
            aria-label="List of awesome Vert.x projects"
            className="fill-gray-700 transition-colors group-hover:fill-gray-900"
            title=""
          />
        </Link>
      ),
    },
    {
      title: "Stack Overflow",
      content: (
        <Link
          href="https://stackoverflow.com/questions/tagged/vert.x"
          className="group"
          aria-label="Stack Overflow"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleIcon
            icon={siStackoverflow}
            size="1em"
            aria-label="Stack Overflow questions related to Vert.x"
            className="fill-gray-700 transition-colors group-hover:fill-gray-900"
            title=""
          />
        </Link>
      ),
    },
    {
      title: "YouTube",
      content: (
        <Link
          href="https://www.youtube.com/channel/UCGN6L3tRhs92Uer3c6VxOSA"
          className="group"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleIcon
            icon={siYoutube}
            size="1em"
            aria-label="YouTube channel of Vert.x"
            className="fill-gray-700 transition-colors group-hover:fill-gray-900"
            title=""
          />
        </Link>
      ),
    },
    {
      title: "Discord",
      content: (
        <Link
          href="https://discord.gg/6ry7aqPWXy"
          className="group"
          aria-label="Discord"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleIcon
            icon={siDiscord}
            size="1em"
            aria-label="Eclipse Vert.x channel on Discord"
            className="fill-gray-700 transition-colors group-hover:fill-gray-900"
            title=""
          />
        </Link>
      ),
    },
    {
      title: "Vert.x User Group",
      content: (
        <Link
          href="https://groups.google.com/forum/?fromgroups#!forum/vertx"
          className="group"
          aria-label="Vert.x User Group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleIcon
            icon={siGooglemessages}
            size="1em"
            aria-label="A Google group for Vert.x users"
            className="fill-gray-700 transition-colors group-hover:fill-gray-900"
            title=""
          />
        </Link>
      ),
    },
    {
      title: "GitHub",
      content: (
        <Link
          href="https://github.com/eclipse-vertx/vert.x"
          className="group"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SimpleIcon
            icon={siGithub}
            size="1em"
            aria-label="GitHub repository"
            className="fill-gray-700 transition-colors group-hover:fill-gray-900"
            title=""
          />
        </Link>
      ),
    },
  ]

  return (
    <>
      <ScrollTopWorkaround />
      <nav
        className={clsx("left-0 right-0 top-0 z-50 flex flex-col", {
          fixed,
          sticky: !fixed && !belowThreshold,
          relative: !fixed,
          "-translate-y-16": !belowThreshold && !fixed && !visible,
          "translate-y-0": collapsed || belowThreshold || (!fixed && visible),
          "transition-transform": needsTransition,
          "duration-200": needsTransition,
        })}
      >
        <div
          className={clsx(
            "top-0 flex h-14 w-full items-center justify-center border-b border-gray-200 px-4 transition-all md:px-6",
            !collapsed
              ? onTop || (!fixed && !visible)
                ? "bg-bg/0 backdrop-blur-none"
                : "bg-bg/80 backdrop-blur-sm"
              : "bg-gray-100",
            collapsed || onTop || (!fixed && !visible)
              ? "border-opacity-0"
              : "border-opacity-100",
          )}
        >
          <div className="flex max-w-screen-2xl flex-1 items-center justify-between">
            <div className="flex flex-1 items-center justify-between xl:hidden">
              <Logo onClick={() => setCollapsed(false)} />
              <div className="flex items-center gap-4">
                <QuickSearch onClick={() => setCollapsed(false)} />
                <button
                  id="navbar-toggle-menu-button"
                  className="inline-flex select-none items-center justify-center text-gray-800"
                  onClick={() => setCollapsed(!collapsed)}
                  aria-label={collapsed ? "Close menu" : "Open menu"}
                >
                  <Hamburger
                    toggled={collapsed}
                    label={collapsed ? "Close menu" : "Open menu"}
                  />
                </button>
              </div>
            </div>
            <div className="hidden flex-1 items-center justify-between gap-8 xl:flex">
              <Logo onClick={() => setCollapsed(false)} />
              <div className="mt-1 flex gap-6">
                {links.map(l => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center gap-4">
                <div className="border-r border-gray-300 pr-4">
                  <QuickSearch />
                </div>
                {/* TODO */}
                {/* <Tooltip
                  content={theme === "dark" ? "Light mode" : "Dark mode"}
                >
                  <div className="flex">
                    <DarkModeToggle id="dark-mode-toggle1" />
                  </div>
                </Tooltip> */}
                <div className="flex items-center gap-3">
                  {socialIcons.map(si => (
                    <Tooltip key={si.title} content={si.title}>
                      {si.content}
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogRoot open={collapsed} onOpenChange={setCollapsed} modal={false}>
          <DialogPortal>
            <RemoveScroll as={Slot}>
              <DialogContent
                className="fixed top-14 z-50 h-[calc(100vh-4rem)] w-screen overflow-scroll bg-gray-100 xl:hidden [&[data-state='closed']]:animate-fade-out [&[data-state='open']]:animate-fade-in"
                onInteractOutside={e => e.preventDefault()}
                onCloseAutoFocus={e => e.preventDefault()}
                onPointerDownOutside={e => e.preventDefault()}
              >
                <div className="flex flex-col divide-y divide-gray-500 px-2">
                  {links.map(l => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className={clsx(
                        "text-gray-800 hover:text-gray-500",
                        "block px-2 py-3",
                      )}
                      onClick={() => setCollapsed(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-end gap-3 px-4">
                  {/* TODO */}
                  {/* <DarkModeToggle id="dark-mode-toggle2" /> */}
                  {socialIcons.map(si => si.content)}
                </div>
                <ResizeObserver onResize={() => setCollapsed(false)} />
              </DialogContent>
            </RemoveScroll>
          </DialogPortal>
        </DialogRoot>
      </nav>
    </>
  )
}

export default NavBar
