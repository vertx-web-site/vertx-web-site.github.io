import classNames from "classnames"
import styles from "./DropDown.scss?type=global"
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
      <a className="dropdown-title" onClick={() => setVisible(!visible)}>{title}<ChevronDown /></a>
      <ul className={classNames("dropdown-menu", { visible, "align-right": align === "right" })}>
        {menuItems}
      </ul>
      <style jsx>{styles}</style>
    </div>
  )
})

export default DropDown
