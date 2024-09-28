import { useActiveSection } from "../hooks/useActiveSection"
import { throttle } from "lodash"
import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useShallow } from "zustand/react/shallow"

interface Top {
  slug: string
  top: number
}

interface ScrollObserverProps {
  children: React.ReactNode
}

const ScrollObserver = ({ children }: ScrollObserverProps) => {
  const [scrollMarginTop, setScrollMarginTop] = useState<number | undefined>(
    undefined,
  )
  const ref = useRef<HTMLDivElement>(null)
  const segment = useSelectedLayoutSegment()
  const { setActiveSection } = useActiveSection(
    useShallow(state => ({
      setActiveSection: state.setActiveSection,
    })),
  )

  // monitor `scroll-top-margin` of the first section
  useEffect(() => {
    let firstSection: HTMLElement | null = ref.current!.querySelector("h2,h3")

    function onResize() {
      if (firstSection !== null) {
        let style = window.getComputedStyle(firstSection)
        let smt = parseInt(style.getPropertyValue("scroll-margin-top"))
        setScrollMarginTop(smt)
      }
    }

    let throttledOnResize = throttle(onResize, 100)
    let resizeObserver = new window.ResizeObserver(throttledOnResize)
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  })

  // register an intersection observer that calculates which section is
  // currently active
  useEffect(() => {
    if (scrollMarginTop === undefined) {
      return
    }

    // add a little bit of space to make sure that we intersect with elements
    // that are *exactly* at scrollMarginTop
    let smt = scrollMarginTop + 1

    // collect all sections
    let sections: HTMLElement[] = Array.from(
      ref.current!.querySelectorAll("h2,h3"),
    )

    let sectionTopsMap = new Map<string, number>()
    let sortedSectionTops: Top[] = []

    function onIntersect(entries: IntersectionObserverEntry[]) {
      let scrollTop = 0
      if (sectionTopsMap.size === 0) {
        for (let e of entries) {
          sectionTopsMap.set(e.target.id, e.boundingClientRect.top)
          sortedSectionTops.push({
            slug: e.target.id,
            top: e.boundingClientRect.top,
          })
        }
      } else {
        scrollTop =
          sectionTopsMap.get(entries[0].target.id)!! -
          entries[0].boundingClientRect.top
      }

      let nextActiveSection: string | undefined = undefined
      for (let s of sortedSectionTops) {
        if (s.top - scrollTop > smt) {
          break
        }
        nextActiveSection = s.slug
      }

      setActiveSection(nextActiveSection)
    }

    let observer = new IntersectionObserver(onIntersect, {
      rootMargin: `-${smt}px 0px 0px 0px`,
      threshold: [0.0, 1.0],
    })

    for (let s of sections) {
      observer.observe(s)
    }

    return () => {
      observer.disconnect()
    }
  }, [segment, scrollMarginTop, setActiveSection])

  return <div ref={ref}>{children}</div>
}

export default ScrollObserver
