interface FeaturesListProps {
  children: React.ReactNode
}

const FeaturesList = ({ children }: FeaturesListProps) => (
  <div className="grid grid-cols-6 gap-x-12 gap-y-20">{children}</div>
)

export default FeaturesList
