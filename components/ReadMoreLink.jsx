import Link from "next/link"
import "./ReadMoreLink.scss"

const ReadMoreLink = ({ href, as, children = (<a>Read more</a>) }) => (
  <span className="read-more-link">
    <Link href={href} as={as}>
      {children}
    </Link>
  </span>
)

export default ReadMoreLink
