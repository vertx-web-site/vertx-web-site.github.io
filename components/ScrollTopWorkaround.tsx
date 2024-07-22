{
  /*
        This workaround is necessary so that the browser scrolls to top
        after navigating to a new page. Explanation:

        * Next.js's InnerScrollAndFocusHandler handles scrolling after
          navigation (see https://github.com/vercel/next.js/blob/12e77cae30f61bd94182931b836ec46a1d79a888/packages/next/src/client/components/layout-router.tsx)
        * For this, it receives a ref to the element to scroll to
        * If the element is not `null`, it just scrolls to it
        * But if the element is `null`, it tries to find the first element on
          the page and scrolls to that instead:
          https://github.com/vercel/next.js/blob/12e77cae30f61bd94182931b836ec46a1d79a888/packages/next/src/client/components/layout-router.tsx#L191-L193
        * If the first element is our navbar and it is fixed, it is already
          in view and InnerScrollAndFocusHandler will do nothing!
          https://github.com/vercel/next.js/blob/12e77cae30f61bd94182931b836ec46a1d79a888/packages/next/src/client/components/layout-router.tsx#L231-L234
        * We therefore have to have an artifical element that always comes
          before the navbar in the DOM and that is always at the top of the
          page so InnerScrollAndFocusHandler can find it and correctly scroll
          to it.

        In addition:
        * As described above, the InnerScrollAndFocusHandler find the first
          element on the **page**!
        * This means our artificial element has to be in page.tsx and not in
          layout.tsx! Otherwise, it won't be found!
        * Always include <ScrollTopWorkaround /> in page.tsx and not in layout.tsx!
        * I've already added it to <NavBar />, so all pages that include the
          navbar in their page.tsx automatically receive this workaround. For
          the doc pages, this does not work, though. That's why I explicitly
          included <ScrollTopWorkaround /> there too.

        What would happen if we removed this element:
        * Whenever you click on a link that leads to a page with a fixed navbar,
          scrolling will not work correctly. Instead, the scroll position will
          stay the same as before the navigation.
        * The browser will not scroll to top if the first element is already in
          view. For blog pages, the first element is always the first paragraph
          in the blog content (for whatever reason). And for all other pages,
          it's always the first heading. It is very likely that one of these
          elements is already in view when you just scroll a little bit. See
          the video that I made here:
          https://github.com/vercel/next.js/issues/63648
          As you can see, if you scroll just a little bit and then click on the
          link, the browser will not scroll to the top of the page (as
          described above). But if you scroll far enough, the first element
          will be out of view, which will cause InnerScrollAndFocusHandler to
          scroll to the top.
      */
}
const ScrollTopWorkaround = () => {
  return <span className="absolute left-0 top-0 h-0" id="__scroll-top"></span>
}

export default ScrollTopWorkaround
