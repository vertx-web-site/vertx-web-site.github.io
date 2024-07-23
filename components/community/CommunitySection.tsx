import { CommunityProfileProps } from "./CommunityProfile"
import clsx from "clsx"
import { ReactElement } from "react"

interface CommunitySectionProps {
  title: string
  size?: "small" | "medium" | "large"
  children: ReactElement<CommunityProfileProps>[]
}

const CommunitySection = ({
  title,
  size = "small",
  children,
}: CommunitySectionProps) => {
  return (
    <section className="mb-32 mt-24">
      <div className="prose mb-14 text-center">
        <h2 className="text-3xl">{title}</h2>
      </div>
      <div
        className={clsx("flex flex-row flex-wrap justify-center gap-x-4", {
          "gap-y-20": size === "large",
          "gap-y-14": size === "medium",
          "gap-y-4": size === "small",
        })}
      >
        {children}
      </div>
    </section>
  )
}

export default CommunitySection
