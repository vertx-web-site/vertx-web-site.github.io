import { throttle } from "lodash"
import { useSelectedLayoutSegment } from "next/navigation"
import { useEffect, useRef } from "react"

interface Top {
  slug: string
  top: number
}

interface ScrollObserverProps {
  children: React.ReactNode
  onChangeSlug?: (slug: string | undefined) => void
}

const ScrollObserver = ({ children, onChangeSlug }: ScrollObserverProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const segment = useSelectedLayoutSegment()

  useEffect(() => {
    let sections: NodeListOf<HTMLElement> = ref.current!.querySelectorAll(
      "div[class='sect1']>h2,div[class='sect2']>h3",
    )
    let tops: Top[] = []
    let currentSlug: string | undefined = undefined

    let smt = 0
    if (sections.length > 0) {
      let style = window.getComputedStyle(sections[0])
      smt = parseInt(style.getPropertyValue("scroll-margin-top"))
    }

    function onResize() {
      sections.forEach(s => {
        let slug = s.id
        if (slug !== undefined) {
          tops.push({
            slug,
            top: s.getBoundingClientRect().top + window.scrollY,
          })
        }
      })
      tops.sort((a, b) => a.top - b.top)
    }

    let throttledOnResize = throttle(onResize, 100)
    let resizeObserver = new window.ResizeObserver(throttledOnResize)
    resizeObserver.observe(document.body)

    function onScroll() {
      let current: string | undefined = undefined
      for (let i = 0; i < tops.length; i++) {
        if (tops[i].top > window.scrollY + smt + 5) {
          break
        }
        current = tops[i].slug
      }
      if (
        current === undefined &&
        tops.length > 0 &&
        tops[0].top < window.scrollY + window.innerHeight
      ) {
        current = tops[0].slug
      }

      if (current !== currentSlug) {
        currentSlug = current
        onChangeSlug?.(current)
      }
    }

    let throttledOnScroll = throttle(onScroll, 100)
    window.addEventListener("scroll", throttledOnScroll, { passive: true })

    onResize()
    onScroll()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("scroll", throttledOnScroll)
    }
  }, [segment, onChangeSlug])

  return <div ref={ref}>{children}</div>
}

export default ScrollObserver
