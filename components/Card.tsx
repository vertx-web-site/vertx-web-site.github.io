import clsx from "clsx"
import Link from "next/link"

interface CardProps {
  title?: React.ReactNode
  href?: string
  children?: React.ReactNode
  className?: string
}

const Card = ({
  title,
  href,
  children,
  className,
  ...props
}: CardProps & Omit<React.HTMLAttributes<HTMLDivElement>, "title">) => {
  let result = (
    <div
      className={clsx(
        "rounded-sm border border-gray-300 px-5 pb-7 pt-5 [&_p:last-child]:mb-2",
        {
          "transition-colors hover:border-primary": href !== undefined,
        },
        className,
      )}
      {...props}
    >
      {title !== undefined ? (
        <h4
          className={clsx("mt-0", {
            "text-primary": href !== undefined,
          })}
        >
          {title}
        </h4>
      ) : undefined}
      {children}
    </div>
  )

  if (href !== undefined) {
    if (href.match(/^https?:\/\//)) {
      result = (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-text hover:no-underline"
        >
          {result}
        </a>
      )
    } else {
      result = (
        <Link href={href} className="text-text hover:no-underline">
          {result}
        </Link>
      )
    }
  }

  return result
}

export default Card
