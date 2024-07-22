import { SVGProps } from "react"
import type { SimpleIcon as SI } from "simple-icons"

interface SimpleIconProps {
  icon: SI
  color?: string
  size?: number
  title?: string
}

const SimpleIcon = ({
  icon,
  color = "currentColor",
  size = 24,
  title = icon.title,
  ...others
}: SimpleIconProps & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <title>{title || ""}</title>
      <path d={icon.path} />
    </svg>
  )
}

export default SimpleIcon
