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
      <div className="flex flex-row items-center justify-start gap-x-4 md:flex-col">
        <div className="flex justify-center">
          {cloneElement(newIcon, {
            ...newIcon.props,
            size: 54,
            weight: "light",
          })}
        </div>
        <h5 className="mb-0 mt-0 text-left text-xl font-normal md:mt-4 md:text-center">
          {title}
        </h5>
      </div>
      {children}
    </div>
  )
}

export default FeaturesItem
