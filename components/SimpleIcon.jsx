const SimpleIcon = ({ icon, color = "currentColor", size = 24, title = icon.title, viewBox = icon.viewBox || "0 0 24 24", ...others }) => {
  return (
    <svg role="img" width={size} height={size} viewBox={viewBox}
        fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...others}>
      <title>{title || ""}</title>
      <path d={icon.path} />
    </svg>
  )
}

export default SimpleIcon
