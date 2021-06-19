import Link from "next/link"
import styles from "./ReadMoreLink.scss"

const ReadMoreLink = ({ href, as, children = (<a>Read more</a>) }) => (
  <span className="read-more-link">
    <Link href={href} as={as}>
      {children}
    </Link>
    <style jsx>{styles}</style>
  </span>
)

export default ReadMoreLink
