"use client"

import Container from "@/components/Container"
import EscapeKeyObserver from "@/components/EscapeKeyObserver"
import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import ResizeObserver from "@/components/ResizeObserver"
import ScrollObserver from "@/components/docs/ScrollObserver"
import SidebarLeft from "@/components/docs/SidebarLeft"
import SidebarRight from "@/components/docs/SidebarRight"
import TocNavBar from "@/components/docs/TocNavBar"
import { ActiveSectionProvider } from "@/components/hooks/useActiveSection"
import { X } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"
import { Dialog, Modal, ModalOverlay } from "react-aria-components"

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false)

  return (
    <>
      <NavBar />
      <TocNavBar isOpen={mobileSidebarOpen} setIsOpen={setMobileSidebarOpen} />
      <Container
        id="docs-layout"
        width="2xl"
        className="mb-10 grid gap-10 [grid-template-columns:minmax(0,1fr)] lg:[grid-template-columns:16rem_minmax(0,1fr)] xl:gap-8 xl:[grid-template-columns:15rem_minmax(0,1fr)_15rem] 2xl:gap-10 2xl:[grid-template-columns:16rem_minmax(0,1fr)_16rem]"
      >
        <ActiveSectionProvider>
          <SidebarLeft className="hidden pt-24 lg:flex" />
          <ScrollObserver>{children}</ScrollObserver>
          <SidebarRight className="hidden pt-24 xl:flex" />
        </ActiveSectionProvider>
      </Container>
      <Footer />

      <ModalOverlay isOpen={mobileSidebarOpen} isKeyboardDismissDisabled={true}>
        <Modal className="fixed bottom-0 left-0 right-0 top-14 z-[100] flex data-[entering]:animate-dialog-fade-in data-[exiting]:animate-dialog-fade-out">
          <Dialog
            aria-label="Documentation menu"
            className="flex h-full w-full bg-bg outline-none dark:bg-gray-100"
          >
            <div className="ml-6 mr-6 mt-6 w-full">
              <SidebarLeft
                sticky={false}
                onClickLink={() => setMobileSidebarOpen(false)}
              />
            </div>
            <button
              aria-label="Close"
              className="absolute right-7 top-5 flex h-6 items-center"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X size="1.25em" />
            </button>
            <EscapeKeyObserver onEscape={() => setMobileSidebarOpen(false)} />
            <ResizeObserver onResize={() => setMobileSidebarOpen(false)} />
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

export default DocsLayout
