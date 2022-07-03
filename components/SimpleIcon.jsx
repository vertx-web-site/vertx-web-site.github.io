const SimpleIcon = ({ icon, color = "currentColor", size = 24, title, ...others }) => {
  return (
    <svg role="img" width={size} height={size} viewBox="0 0 24 24"
        fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...others}>
      <title>{title || icon.title || ""}</title>
      <path d={icon.path} />
    </svg>
  )
}

export default SimpleIcon
