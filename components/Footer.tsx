"use client"

import * as Accordion from "@radix-ui/react-accordion"
import DarkModeToggle from "./DarkModeToggle"
import { useVersion } from "./hooks/useVersion"
import { latestRelease } from "@/docs/metadata/all"
import { CaretDown } from "@phosphor-icons/react/dist/ssr"
import clsx from "clsx"
import Link from "next/link"
import { forwardRef } from "react"

interface AccordionItemProps {
  children: React.ReactNode
  className?: string
  value: string
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={clsx("overflow-hidden", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
)

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={clsx(
          "group flex h-12 flex-1 cursor-default items-center justify-between px-5 text-base font-normal uppercase leading-none outline-none focus-visible:-outline-offset-8 focus-visible:outline-primary",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <CaretDown
          className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
)

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={clsx(
        "overflow-hidden data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="px-5">{children}</div>
    </Accordion.Content>
  ),
)

const Footer = () => {
  const { version } = useVersion()

  const menu1 = [
    version !== latestRelease.version ? (
      <Link key="docs" href={`/docs/${version}/`}>
        Docs
      </Link>
    ) : (
      <Link key="docs" href="/docs/">
        Docs
      </Link>
    ),
    <Link key="faq" href="/docs/faq">
      FAQ
    </Link>,
    <Link key="blog" href="/blog/">
      Blog
    </Link>,
    <Link key="community" href="/community/">
      Community
    </Link>,
    <a key="github" href="https://github.com/eclipse-vertx/vert.x">
      GitHub
    </a>,
  ]

  const menu2 = [
    <Link key="download" href="/download/">
      Download
    </Link>,
    <Link key="channels" href="/resources/#channels">
      Channels
    </Link>,
    <a key="howtos" href="https://how-to.vertx.io/">
      How-Tos
    </a>,
    <a key="appgenerator" href="https://start.vertx.io/">
      App Generator
    </a>,
    <a key="securitytxt" href="/.well-known/security.txt">
      security.txt
    </a>,
  ]

  const menu3 = [
    <a key="eclipse" href="https://www.eclipse.org/">
      Eclipse Foundation
    </a>,
    <a key="privacy" href="https://www.eclipse.org/legal/privacy.php">
      Privacy Policy
    </a>,
    <a key="termsofuse" href="https://www.eclipse.org/legal/termsofuse.php">
      Terms of Use
    </a>,
    <a key="copyright" href="https://www.eclipse.org/legal/copyright.php">
      Copyright Agent
    </a>,
    <a key="legal" href="https://www.eclipse.org/legal/">
      Legal Resources
    </a>,
  ]

  return (
    <footer className="mt-24 border-t border-gray-300 bg-gray-100 px-4 py-16 text-sm leading-6 text-gray-600 md:px-8 hover:[&_a]:text-primary hover:[&_a]:underline [&_h5]:mb-6 [&_h5]:text-base [&_h5]:font-normal [&_h5]:uppercase [&_h5]:leading-none">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
          <div className="max-w-[50%]">
            <Link href="/">
              <img
                width={150}
                src={require("../assets/logo.svg")}
                alt="Vert.x Logo"
                className="opacity-50 saturate-0 transition-all hover:opacity-100 hover:saturate-100 dark:hidden lg:max-w-fit"
              />
              <img
                width={150}
                src={require("../assets/logo-white.svg")}
                alt="Vert.x Logo"
                className="hidden opacity-70 saturate-0 transition-all hover:opacity-100 hover:saturate-100 dark:block lg:max-w-fit"
              />
            </Link>
          </div>

          <div className="hidden lg:block">
            <h5>Eclipse Vert.x</h5>
            <ul className="leading-loose">
              {menu1.map(item => (
                <li key={item.key}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h5>Resources</h5>
            <ul className="leading-loose">
              {menu2.map(item => (
                <li key={item.key}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block">
            <h5>Eclipse</h5>
            <ul className="leading-loose">
              {menu3.map(item => (
                <li key={item.key}>{item}</li>
              ))}
            </ul>
          </div>

          <Accordion.Root
            className="w-[90%] sm:w-[80%] lg:hidden"
            type="single"
            collapsible
          >
            <AccordionItem value="vertx">
              <AccordionTrigger>Eclipse Vert.x</AccordionTrigger>
              <AccordionContent>
                <ul className="mb-6 leading-loose">
                  {menu1.map(item => (
                    <li key={item.key}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resources">
              <AccordionTrigger>Resources</AccordionTrigger>
              <AccordionContent>
                <ul className="mb-6 leading-loose">
                  {menu2.map(item => (
                    <li key={item.key}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eclipse">
              <AccordionTrigger>Eclipse</AccordionTrigger>
              <AccordionContent>
                <ul className="mb-6 leading-loose">
                  {menu3.map(item => (
                    <li key={item.key}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion.Root>
          <div className="flex flex-1 justify-end">
            <DarkModeToggle />
          </div>
        </div>

        <div className="mx-auto flex max-w-[80%] flex-col-reverse items-center justify-between gap-10 text-center md:mx-0 md:max-w-none md:flex-row md:gap-20 md:text-left">
          <div>
            &copy; {new Date().getFullYear()} Eclipse Vert.x&trade;
            <br />
            Eclipse Vert.x&trade; is open source and dual-licensed under the{" "}
            <span className="sm:text-nowrap">
              <a
                href="https://www.eclipse.org/legal/epl-2.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Eclipse Public License 2.0
              </a>{" "}
              and the{" "}
              <a
                href="https://www.apache.org/licenses/LICENSE-2.0.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apache License 2.0
              </a>
              .
            </span>
            <br />
            Website design by{" "}
            <a
              href="https://michelkraemer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:text-nowrap"
            >
              Michel Krämer
            </a>
            .
          </div>

          <div className="max-w-[60%]">
            <a
              href="https://www.eclipse.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("../assets/eclipse-foundation-logo.svg")}
                alt="Eclipse foundation Logo"
                width={200}
                className="opacity-50 saturate-0 transition-all hover:opacity-100 hover:saturate-100 dark:hidden md:max-w-fit"
              />
              <img
                src={require("../assets/eclipse-foundation-logo-dark.svg")}
                alt="Eclipse foundation Logo"
                width={200}
                className="hidden opacity-70 saturate-0 transition-all hover:opacity-100 hover:saturate-100 dark:inline md:max-w-fit"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
