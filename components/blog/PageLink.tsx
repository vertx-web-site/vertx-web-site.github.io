import clsx from "clsx"
import Link from "next/link"

function makePageHref(page: number, category: string | undefined) {
  let c = ["/blog"]
  if (category !== undefined) {
    c.push("category")
    c.push(category)
  }
  if (page > 1) {
    c.push("page")
    c.push(`${page}`)
  }
  return c.join("/")
}

interface PageLinkProps {
  page?: number
  active?: boolean
  disabled?: boolean
  category: string | undefined
  children: string | number
}

const PageLink = ({
  page,
  active = false,
  disabled = false,
  category,
  children,
}: PageLinkProps) => {
  let elem = (
    <div
      className={clsx("w-7 select-none rounded-sm py-1 text-center", {
        "bg-primary text-bg": active,
        "hover:bg-gray-200": !active && !disabled,
        "text-gray-500 dark:text-gray-300": disabled,
      })}
    >
      {children}
    </div>
  )

  if (!active && page !== undefined) {
    return <Link href={makePageHref(page, category)}>{elem}</Link>
  } else {
    return elem
  }
}

export default PageLink
