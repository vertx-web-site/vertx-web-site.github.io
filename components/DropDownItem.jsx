import classNames from "classnames"
import styles from "./DropDownItem.scss"
import { Check } from "react-feather"
import Link from "next/link"

const DropDownItem = (({ active, onClick, href, hasActiveSiblings = false, children }) => {
  let content = (
    <li className={classNames("dropdown-item", { active, "has-active-siblings": hasActiveSiblings })}
        onClick={onClick}>
      {active && <Check className="dropdown-check-icon" />}{children}
      <style jsx>{styles}</style>
    </li>
  )

  if (href) {
    return (
      <Link href={href}><a>{content}</a></Link>
    )
  } else {
    return content
  }
})

export default DropDownItem
