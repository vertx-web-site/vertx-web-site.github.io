import classNames from "classnames"
import "./DropDownItem.scss"
import { Check } from "react-feather"
import Link from "next/link"

const DropDownItem = (({ active, onClick, href, children }) => {
  let content = (
    <li className={classNames("dropdown-item", { active })} onClick={onClick}>
      {active && <Check className="dropdown-check-icon" />}{children}
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
