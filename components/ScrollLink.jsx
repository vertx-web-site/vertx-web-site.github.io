import { smoothScrollTo } from "./lib/scroll-utils"
import NavBarContext from "./contexts/NavBarContext"
import { useCallback, useContext, useEffect } from "react"
import { useRouter } from "next/router"

const ScrollLink = (props) => {
  const navBarState = useContext(NavBarContext.State)

  if (props.href[0] !== "#") {
    throw new Error(`ScrollLink href '${props.href}' must begin with a '#' character`)
  }
  let id = props.href.substring(1)
  let router = useRouter()

  const handleClick = useCallback(() => {
    let target = document.getElementById(id)
    if (target) {
      let offset = target.offsetTop - navBarState.height
      smoothScrollTo(offset, 500, id)
    }
  }, [id, navBarState.height])

  useEffect(() => {
    let hash = router.asPath.substring(router.asPath.indexOf("#") + 1)
    if (hash === id) {
      handleClick()
    }
  }, [id, router, handleClick])

  return <a {...props} onClick={handleClick}></a>
}

export default ScrollLink
