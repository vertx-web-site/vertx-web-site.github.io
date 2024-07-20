import { IconProps } from "@phosphor-icons/react"
import clsx from "clsx"
import { ReactElement, ReactNode, cloneElement } from "react"

interface FeaturesItemProps {
  icon: ReactElement<IconProps>
  title: string
  className?: String
  children: ReactNode
}

const FeaturesItem = ({
  icon,
  title,
  className,
  children,
}: FeaturesItemProps) => {
  let newIcon = cloneElement(icon, {
    size: 46,
  })

  return (
    <div className={clsx("prose hyphens-auto text-justify", className)}>
      <div className="flex justify-center">
        {cloneElement(newIcon, {
          ...newIcon.props,
          size: 54,
          weight: "light",
        })}
      </div>
      <h5 className="mb-5 mt-4 text-center text-xl font-normal">{title}</h5>
      {children}
    </div>
  )
}

export default FeaturesItem
