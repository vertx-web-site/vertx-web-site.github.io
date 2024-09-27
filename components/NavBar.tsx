"use client"

import EscapeKeyObserver from "./EscapeKeyObserver"
import ResizeObserver from "./ResizeObserver"
import ScrollTopWorkaround from "./ScrollTopWorkaround"
import SimpleIcon from "./SimpleIcon"
import { Tooltip } from "./Tooltip"
import VersionSwitcher from "./VersionSwitcher"
import { useVersion } from "./hooks/useVersion"
import QuickSearch from "./search/QuickSearch"
import { latestRelease } from "@/docs/metadata/all"
import clsx from "clsx"
import { Spin as Hamburger } from "hamburger-react"
import { throttle } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import { Dialog, Modal, ModalOverlay } from "react-aria-components"
import {
  siAwesomelists,
  siDiscord,
  siGithub,
  siGooglemessages,
  siStackoverflow,
  siYoutube,
} from "simple-icons"

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
        src={require("../assets/logo-white.svg")}
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
}

const NavBar = ({ fixed = true }: NavBarProps) => {
  const lastScrollY = useRef(-1)
  const [belowThreshold, setBelowThreshold] = useState(true)
  const [needsTransition, setNeedsTransition] = useState(false)
  const [visible, setVisible] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [onTop, setOnTop] = useState(true)
  const pathname = usePathname()
  const { version } = useVersion()

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
      href: version !== latestRelease.version ? `/docs/${version}` : "/docs/",
      label: "Docs",
    },
    {
      href: "/resources/",
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
          href="https://groups.google.com/g/vertx"
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
            <div className="flex flex-1 items-center justify-between xl:gap-6 2xl:gap-8">
              <Logo onClick={() => setCollapsed(false)} />
              <div className="hidden gap-6 xl:flex">
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
              <div className="hidden flex-1 xl:block"></div>
              <div className="flex items-center gap-4">
                <VersionSwitcher bg={!fixed && onTop ? "primary" : "gray"} />
                <div className="flex justify-center xl:border-r xl:border-gray-300 xl:pr-4">
                  <QuickSearch />
                </div>
                <div className="hidden items-center gap-3 xl:flex">
                  {socialIcons.map(si => (
                    <Tooltip key={si.title} content={si.title}>
                      {si.content}
                    </Tooltip>
                  ))}
                </div>
                <button
                  id="navbar-toggle-menu-button"
                  className="inline-flex select-none items-center justify-center text-gray-800 xl:hidden"
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
          </div>
        </div>

        <ModalOverlay isOpen={collapsed} isKeyboardDismissDisabled={true}>
          <Modal className="fixed bottom-0 left-0 right-0 top-14 z-[150] overflow-scroll bg-gray-100 data-[entering]:animate-fade-in data-[exiting]:animate-fade-out xl:hidden">
            <Dialog
              aria-label="Main menu"
              className="flex flex-col overflow-hidden outline-none"
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
                {socialIcons.map(si => (
                  <React.Fragment key={si.title}>{si.content}</React.Fragment>
                ))}
              </div>
              <div className="mt-4 flex justify-end px-4 xs:hidden">
                <VersionSwitcher bg={!fixed && onTop ? "primary" : "gray"} />
              </div>
              <EscapeKeyObserver onEscape={() => setCollapsed(false)} />
              <ResizeObserver onResize={() => setCollapsed(false)} />
            </Dialog>
          </Modal>
        </ModalOverlay>
      </nav>
    </>
  )
}

export default NavBar
