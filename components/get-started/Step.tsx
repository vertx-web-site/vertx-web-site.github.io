import { ReactNode } from "react"

interface StepProps {
  n: number
  id: string
  children: ReactNode
}

const Step = ({ n, id, children }: StepProps) => {
  return (
    <h2 className="mt-10 inline-flex items-center gap-3" id={id}>
      <span className="inline-flex aspect-square h-12 w-12 items-center justify-center rounded-sm bg-primary text-4xl leading-none text-white">
        {n}
      </span>
      {children}
    </h2>
  )
}

export default Step
