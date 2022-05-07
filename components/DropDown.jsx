import classNames from "classnames"
import styles from "./DropDown.scss"
import { ChevronDown } from "react-feather"
import { Children, cloneElement, isValidElement, useEffect, useState } from "react"

const DropDown = (({ title, children, align = "left" }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onDocumentClick() {
      if (visible) {
        setVisible(false)
      }
    }

    document.addEventListener("click", onDocumentClick)

    return () => {
      document.removeEventListener("click", onDocumentClick)
    }
  }, [visible])

  function onClick() {
    // Let the click propagate to the parent element first before we make
    // the drop down menu visible. This makes sure other drop down menus on the
    // page are closed. If we'd call setVisible without setTimeout here, our
    // menu would never be displayed because the onDocumentClick handler above
    // would just hide it again.
    setTimeout(() => {
      setVisible(!visible)
    }, 0)
  }

  let hasActive = false
  Children.forEach(children, c => {
    let active = isValidElement(c) && c.props !== undefined && c.props.active
    if (active) {
      hasActive = true
    }
  })

  let menuItems = children
  if (hasActive) {
    menuItems = Children.map(children, c => cloneElement(c, { hasActiveSiblings: true }))
  }

  return (
    <div className="dropdown">
      <a className="dropdown-title" onClick={onClick}>{title}<ChevronDown /></a>
      <ul className={classNames("dropdown-menu", { visible, "align-right": align === "right" })}>
        {menuItems}
      </ul>
      <style jsx>{styles}</style>
    </div>
  )
})

export default DropDown
