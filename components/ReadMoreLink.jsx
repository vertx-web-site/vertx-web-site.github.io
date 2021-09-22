import Link from "next/link"
import styles from "./ReadMoreLink.scss"

const ReadMoreLink = ({ href, as, children = (<a> 阅读更多</a>) }) => (
  <span className="read-more-link">
    <Link href={href} as={as}>
      {children}
    </Link>
    <style jsx>{styles}</style>
  </span>
)

export default ReadMoreLink
