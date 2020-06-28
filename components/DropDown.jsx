import classNames from "classnames"
import "./DropDown.scss"
import { ChevronDown } from "react-feather"
import { useEffect, useState } from "react"

const DropDown = (({ title, children }) => {
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

  return (
    <div className="dropdown">
      <a className="dropdown-title" onClick={() => setVisible(!visible)}>{title}<ChevronDown /></a>
      <ul className={classNames("dropdown-menu", { visible })}>
        {children}
      </ul>
    </div>
  )
})

export default DropDown
