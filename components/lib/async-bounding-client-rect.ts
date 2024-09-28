// Asynchronously get bounding client rects of the given elements to avoid a
// forced reflow. See "What forces layout / reflow":
// https://gist.github.com/paulirish/5d52fb081b3570c81e3a
function asyncBoundingClientRect(elements: Element[]): Promise<DOMRect[]> {
  let result = new Promise<DOMRect[]>(resolve => {
    function onIntersect(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) {
      let rects: DOMRect[] = []
      for (let e of entries) {
        rects.push(e.boundingClientRect)
      }

      resolve(rects)

      observer.disconnect()
    }

    let observer = new IntersectionObserver(onIntersect)
    for (let e of elements) {
      observer.observe(e)
    }
  })

  return result
}

export default asyncBoundingClientRect
