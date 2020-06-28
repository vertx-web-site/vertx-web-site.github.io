import classNames from "classnames"
import "./DropDownItem.scss"
import { Check } from "react-feather"

const DropDownItem = (({ active, onClick, children }) => {
  return (
    <li className={classNames("dropdown-item", { active })} onClick={onClick}>
      {active && <Check className="dropdown-check-icon" />}{children}
    </li>
  )
})

export default DropDownItem
